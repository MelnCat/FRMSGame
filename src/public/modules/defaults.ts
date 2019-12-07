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

export const wall = (...arr: number[]) => apply("wall", true, ...arr);
export const defaults: Defaults = {
	bg: {
		...wall(0)
	},
	fg: {
		...wall(2, 3, 4, 5)
	}
};
;
