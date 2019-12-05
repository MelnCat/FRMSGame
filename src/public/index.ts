import * as Swal from "sweetalert2"; // eslint-disable-line
import JSON5 from "json5";
import util from "util";
import { start } from "repl";
// #region CLASSES
const gridSize = 5;
declare global {
	export type TileResolvable = number | [number] | [number, number] | [number, number, TileOptions]
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
		return this.indexNoFlat?.[x]?.[y] || null;
	}
	public set(x: number, y: number, newVal: T | any) {
		this.arr[x][y] = newVal;
		return newVal;
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
		return Array.from(this.indexNoFlat.entries())
			.filter(([i, v]) => i >= startY && i <= endY)
			.map(x => x[1])
			.map(x => Array.from(x.entries())
				.filter(([i, v]) => i >= startX && i <= endX)
				.map(y => y[1]));
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
}
const player = {
	x: 0,
	y: 0,
	area: ""
};
// #endregion
interface TileOptions {
	wall?: boolean; // walk through
	disabled?: boolean; // not 'use'able
	start?: number; // start area, 0 is default
	end?: number; // end area, provides start id, 0 is default
	use?: {
		[id: number]: (this: Coords<any>) => any;
	};
}
const isString = (val: any): val is string => typeof val === "string";
const isNumber = (val: any): val is number => typeof val === "number";
const tileParser = (arr: TileResolvable[][]): Terrain[][] => // [number: bg, number: fg, opts]
	 arr.map(x => x.map(y => {
		if (isNumber(y)) y = [y];
		const [background = 0, foreground = 0, options = {} as TileOptions] = y;
		return [new Tile(background), new Tile(foreground, options)];
	}))
;
const areaFileParser = (text: string) => text.split("\n").map(x => x.split(/\s+/).map(y => y.split(/:\s+/).map(z => Number.parseInt(z, 16))));

const importArea = async(name: string) => {
	const areaRaw = await import(`./areas/${name}`);
	const area: TileResolvable[][] = areaRaw.area;
	const file = tileParser(area);
	const plane = new Plane(file);
	return plane;
};
const getGridElement = (x: number, y: number) => document.getElementById(`grid-${(y * gridSize) + x}`);
const loadArea = async(): Promise<void | any> => {
	const plane = await importArea(player.area);
	const { x, y } = player;
	const surrounding = plane.getArea(player.x - 2, player.y - 3, player.x + 2, player.y + 2);
	for (const e of surrounding.flat()) {
		const elem = getGridElement(e.x, e.y);
		if (!elem) console.error(e.x, e.y);
		elem!.style.backgroundImage = `url(./img/background/${e.value[0].texture}.png)`;
	}
};
const startArea = async(starting = 0) => {
	const plane = await importArea(player.area);
	const center = plane.indexFlat.find(x => x.value.some(y => y.options.start === starting));
	if (!center) throw new Error(`Area "${name}" does not have a start.`);
	player.x = center.x;
	player.y = center.y;
};
const setArea = async(area: string) => {
	player.area = area;
	// // await loadArea();
};
window.onload = async() => {
	// #region
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
		elem.innerHTML = "<p>yeet</p>";
	}
	// > Tile init
	// #endregion
	await setArea("test_area");
	await startArea();
	await loadArea();
};
