import * as Swal from "sweetalert2"; // eslint-disable-line
import JSON5 from "json5";
import util from "util";
import { defaults } from "./modules/defaults";
// #region TEXT
let convo = false;
const untilTrue = (func: Function) => new Promise(res => {
	const inter = setInterval(async() => await func() && (res(true), clearInterval(inter)));
});
const sleep = (milliseconds: number) => () => new Promise(resolve => setTimeout(resolve, milliseconds));
export const typewrite = async(id: string | HTMLElement, string: string, persist: (() => Promise<any>) | Promise<any>, breakLoop: (() => Promise<any>) | Promise<any> = async() => false) => {
	const elem = id instanceof HTMLElement ? id : document.getElementById(id);
	if (!elem) return elem;
	convo = true;
	elem.innerText = "";
	for (const i of string) {
		if (!await (breakLoop instanceof Promise ? breakLoop : breakLoop())) await sleep(40)();
		elem.innerHTML += i;
	};
	await untilTrue(persist instanceof Promise ? () => persist : persist);
	elem.innerText = "";
	convo = false;
};
const waitUntil = (...keys: string[]) => new Promise(res => {
	const ev = (event: KeyboardEvent): any => keys.some(x => x === event.code) && (window.removeEventListener("keypress", ev), res(event.code));
	window.addEventListener("keypress", ev);
});
const onKey = (func: (event?: KeyboardEvent, stop?: Function) => any, ...keys: string[]) => {
	const l = (event: KeyboardEvent): any => keys.some(x => x === event.code) && func(event, () => window.removeEventListener("keydown", l));
	window.addEventListener("keydown", l);
};
export const say = (elem: HTMLElement | string, text: string) => {
	let pressed = 0;
	onKey((e, stop) => { pressed = Date.now() + 100; stop?.(); }, "Space");
	const getPressed = async() => pressed;
	let pressed2 = false;
	let done = false;
	onKey((e, stop) => pressed <= Date.now() || done ? (pressed2 = true, stop?.()) : "", "Space");
	const getPressed2 = async() => { done = true; return pressed2; };
	typewrite(elem, text, getPressed2, getPressed);
	return new Promise(res => untilTrue(() => pressed2).then(res));
};
export const speak = (text: string) => new Promise(res => setTimeout(() => say("box", text).then(res), 100));
// #endregion
// #region CLASSES]
const createElement = <T extends keyof HTMLElementTagNameMap>(type: T, func: (this: HTMLElementTagNameMap[T], elem: HTMLElementTagNameMap[T]) => void | any = () => true): HTMLElementTagNameMap[T] => {
	const e = document.createElement(type);
	func.call(e, e);
	return e;
};
const gridSize = 5;
declare global {
	export interface TileOptions {
		wall?: boolean; // walk through
		disabled?: boolean; // not 'use'able
		start?: number; // start area, 0 is default
		end?: number; // end area, provides start id, 0 is default
		use?: (this: Coords<Terrain>, data: any, item: number | null) => any;
		data?: any;
		crossable?: number[];
		flip?: false | "Y" | "X";
		rotate?: number;
	}
	export type TileResolvable = number | [number] | [number, number] | [number, number, TileOptions]
	export interface Attack {
		name: string;
		damage: number;
		chance: number;
		text: string[];
	}
	export interface User {
		name: string;
		attacks: Attack[];
	}
}
class Tile {
	public constructor(public id: number, public options: TileOptions = {}, public texture = id) {

	}
}
type Terrain = [Tile, Tile]
interface Coords<T> {
	readonly value: T;
	readonly x: number;
	readonly y: number;
}
class Plane<T> {
	public constructor(public arr: T[][]) {}
	public get indexNoFlat() {
		return Array.from(this.arr.entries()).map(([i, v]) => Array.from(v.entries()).map(([j, k]) => ({ x: i, y: j, value: k } as const)));
	}
	public get indexFlat() {
		return this.indexNoFlat.flat();
	}
	public get(x: number, y: number) {
		return this.indexNoFlat?.[y]?.[x] || null;
	}
	public set(x: number, y: number, newVal: T | any) {
		return this.arr[y][x] = newVal;
	}
	public getSurrounding(x: number, y: number) {
		const center = this.get(x, y);
		if (!center) return center;
		return {
			center,
			up: this.get(x, y - 1),
			left: this.get(x - 1, y),
			down: this.get(x, y + 1),
			right: this.get(x + 1, y)
		};
	}
	public getArea(startX: number, startY: number, endX: number, endY: number) {
		return this.indexNoFlat.slice(Math.max(0, startY), endY + 1).map(x => x.slice(Math.max(0, startX), endX + 1));
	}
	public findValue(val: T) {
		return this.indexFlat.find(x => x.value === val);
	}
	public get width() {
		return this.arr.sort((a, b) => b.length - a.length)[0].length;
	}
	public get height() {
		return this.arr.length;
	}
	public get center() {
		return this.arr[Math.floor(this.width / 2)]?.[Math.floor(this.height / 2)];
	}
	public *[Symbol.iterator]() {
		for (const x of this.indexFlat) yield x;
	}
}
const areaCache: {[name: string]: Plane<Terrain>} = {};
const player: {
	x: number;
	y: number;
	area: string;
	texId: number;
	look: "up" | "down" | "left" | "right";
} = {
	x: 3,
	y: 3,
	area: "",
	texId: 1,
	look: "down"
};
// #endregion
const isString = (val: any): val is string => typeof val === "string";
const isNumber = (val: any): val is number => typeof val === "number";
const tileParser = (arr: TileResolvable[][]): Terrain[][] => // [number: bg, number: fg, opts]
	 arr.map(x => x.map(y => {
		if (isNumber(y)) y = [y];
		const [background = 0, foreground = 0, options = {} as TileOptions] = y;
		return [new Tile(background, defaults.bg[background]), new Tile(foreground, Object.assign({}, defaults.fg[foreground], options))];
	}))
;
const areaFileParser = (text: string) => text.split("\n").map(x => x.split(/\s+/).map(y => y.split(/:\s+/).map(z => Number.parseInt(z, 16))));

const importArea = async(name: string) => {
	if (areaCache[name]) return areaCache[name];
	const areaRaw = await import(`./areas/${name}`);
	const empty = Array(areaRaw.area[0].length + 4).fill(0);
	const area: TileResolvable[][] = [empty, empty, ...areaRaw.area.map((x: Array<any>) => [0, 0, ...x, 0, 0]), empty, empty];
	const file = tileParser(area);
	const plane = new Plane(file);
	areaCache[name] = plane;
	return plane;
};
const toN = (x: number, y: number) => (x * gridSize) + y;
const getGridElement = (x: number, y: number): HTMLDivElement => document.getElementById(`grid-${toN(x, y)}`) as any;
const getForegroundElement = (x: number, y: number): HTMLImageElement => document.getElementById(`grid-${toN(x, y)}-fg`) as any;
const getPlayerElement = (x: number, y: number): HTMLImageElement => document.getElementById(`grid-${toN(x, y)}-player`) as any;
const getSurrounding = async() => {
	const plane = await importArea(player.area);
	const area = plane.getArea(player.x - 2, player.y - 2, player.x + 2, player.y + 2);
	return [new Plane(area.map(k => k.map(z => z.value))).indexFlat, area] as const;
};
const getDirect = async() => {
	const plane = await importArea(player.area);
	return plane.getSurrounding(player.x, player.y);
};
const loadArea = async(): Promise<void | any> => {
	const { x, y } = player;
	const [surrounding, area] = await getSurrounding();
	for (const e of surrounding) {
		const elem = getGridElement(e.x, e.y);
		const fg = getForegroundElement(e.x, e.y);
		const plyr = getPlayerElement(e.x, e.y);
		elem.classList.remove("flipX");
		elem.classList.remove("flipY");
		fg.classList.remove("flipX");
		fg.classList.remove("flipY");
		const bgOpts = e.value[0].options;
		const fgOpts = e.value[1].options;
		if (!elem || !fg || !plyr) console.error(e.x, e.y);
		if (bgOpts.flip) elem.classList.add(`flip${bgOpts.flip}`);
		elem!.style.backgroundImage = `url(./img/background/${e.value[0].texture}.png)`;
		if (fgOpts.flip) fg.classList.add(`flip${fgOpts.flip}`);
		// // fg.classList.add(`fg.${e.value[1].texture}`);
		fg!.src = `./img/foreground/${e.value[1].texture}.png`;
		if (e.x === (Math.round(gridSize / 2) - 1) && e.y === (Math.round(gridSize / 2) - 1)) plyr.src = `./img/player/${player.texId}.png`;
		else plyr.src = "";
	}
};
const startArea = async(starting = 0) => {
	const plane = await importArea(player.area);
	const center = plane.indexFlat.find(x => x.value.some(y => y.options.start === starting));
	if (!center) throw new Error(`Area "${name}" does not have a start.`);
	player.x = center.y;
	player.y = center.x;
};
const setArea = async(area: string) => {
	player.area = area;
	// // await loadArea();
};
window.onload = async() => {
	// #region
	// const onKey = (func: (event?: KeyboardEvent) => any, ...keys: string[]) => window.addEventListener("keydown", event => keys.some(x => x === event.code) && func(event));
	const uuidv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
	  const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
	  return v.toString(16);
	});
	let id = localStorage.getItem("save-id");
	if (!id) {
		id = uuidv4();
		localStorage.setItem("save-id", id);
	}
	const save = async() => {
		const data = {
			player: {
				x: player.x,
				y: player.y
			}
		};
		await fetch("/api/saves", {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};
	save();
	const ctn = document.getElementById("grid")!;
	for (let i = 0; i < (gridSize ** 2); i++) {
		const elem = document.createElement("DIV");
		ctn.append(elem);
		elem.classList.add("grid-item");
		elem.id = `grid-${i}`;
		const foreground = document.createElement("IMG");
		foreground.id = `grid-${i}-fg`;
		foreground.classList.add("fg");
		elem.append(foreground);
		const playerelem = document.createElement("IMG");
		playerelem.id = `grid-${i}-player`;
		playerelem.classList.add("player");
		elem.append(playerelem);
	}
	// #endregion
	const speechbox = document.createElement("div");
	speechbox.id = "speechbox";
	ctn.append(speechbox);
	const box = document.createElement("p");
	box.id = "box";
	speechbox.append(box);
	// > Tile init
	await setArea("test_area");
	await startArea();
	await loadArea();
	const check = async(look: "left" | "right" | "up" | "down") => {
		const area = await importArea(player.area);
		const surr = await getDirect();
		if (!surr || !surr[look]) return false;
		const { [look]: { value: [{ options: bgOptions }, { options: fgOptions }] } } = surr;
		if (bgOptions.wall || fgOptions.wall) return false;
		return true;
	};
	const right = async() => {
		player.look = "right";
		if (!await check("right")) return;
		player.x++;
		await loadArea();
	};
	const left = async() => {
		player.look = "left";
		if (!await check("left")) return;
		player.x--;
		await loadArea();
	};
	const down = async() => {
		player.look = "down";
		if (!await check("down")) return;
		player.y++;
		await loadArea();
	};
	const up = async() => {
		player.look = "up";
		if (!await check("up")) return;
		player.y--;
		await loadArea();
	};
	let movable = true;
	window.addEventListener("keydown", async event => {
		if (!movable || convo) return;
		movable = false;
		switch (event.code) {
			case "ArrowLeft":
			case "KeyA":
				await left();
				break;
			case "ArrowRight":
			case "KeyD":
				await right();
				break;
			case "ArrowUp":
			case "KeyW":
				await up();
				break;
			case "ArrowDown":
			case "KeyS":
				await down();
				break;
			case "Enter":
			case "Space":
				const plane = await importArea(player.area);
				const surrounding = plane.getSurrounding(player.x, player.y);
				const fg = surrounding[player.look].value[1];
				if (fg.options.disabled) return;
				await fg.options.use?.call(surrounding[player.look], fg.options.data, null);
				break;
		}
		setTimeout(() => movable = true, 50);
	}, true);
};
