import { speak, moveSlow, sleep, converse, NEWLINE } from "../index";
export interface Default {
	[index: number]: TileOptions;
}
export interface Defaults {
	bg: Default;
	fg: Default;
}
export type Applied<T extends number[]> = {
	[index in T[number]]: {
		[index in keyof TileOptions]: TileOptions[index];
	};
}
export const apply = <T extends keyof TileOptions>(name: T, value: TileOptions[T], ...arr: number[]) => arr.reduce((p, c) => { p[c] = { [name]: value }; return p; }, {} as (Applied<typeof arr>));
export const applyObject = <T extends Partial<TileOptions>>(obj: T, ...arr: number[]) => arr.reduce((p, c) => { p[c] = obj; return p; }, {} as (Applied<typeof arr>));

export const wall = (...arr: number[]) => apply("wall", true, ...arr);
export const defaults: Defaults = {
	bg: {
		...wall(0),
		1: {
			async stand() {
				await moveSlow("down");
			}
		}
	},
	fg: {
		2: {
			wall: true,
			async use() {
				await speak("A simple table.");
				this.value[1].texture = 3;
				console.log(this);
			}
		},
		...applyObject({ wall: true, async use() { await converse("A comfy chair.", "Too bad it's digital."); } }, 3, 4, 5, 6),
		...applyObject({ wall: true, async use() { await converse("A couple of lockers.", "None of them are mine."); } },
		 7, 8, 9),
		 ...applyObject({ wall: true, async use() { await converse("These lockers fell.", "Hopefully no fragile items are inside."); } },
		 10, 11),
		 12: {
			 async use() { await converse("Looks like this locker door is about to break."); await sleep(1000); this.value[1].id = 13; await converse("Oops."); this.value[1].resetOptions(); this.value[1].options.use = async function use() { await converse("That was probably vandalism, but I don't care."); }; },
			 wall: true
		 },
		 13: {
			 async use() { await converse("Where did the locker door go?"); },
			 wall: true
		 },
		 ...applyObject({ wall: true, async use() { await converse("I can see the second floor.", "Hopefully nobody falls off.\nDying is illegal."); } },
		 14, 15, 16, 17),
		 ...applyObject({ wall: true, async use() { await converse("Some debris.", "Probably fell from the ceiling."); } },
		 18, 18.1, 18.2, 18.3),
	}
};
;
