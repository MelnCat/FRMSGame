import { speak, moveSlow } from "../index";
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
		...applyObject({ wall: true, async use() { await speak("A comfy chair."); await speak("Too bad it's digital."); } }, 3, 4, 5, 6)
	}
};
;
