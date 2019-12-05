/** @type {TileResolvable} */
export const area: TileResolvable[][] = [
	[1, 1, 1, 1, 1, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 1],
	[1, 1, 1, [1, 0, { start: 0 }], 1, 1, 1, 1],
	[1, 2, 1, 1, 2, 1, 1, 1],
	[2, 1, 2, 1, 1, 2, 1, 2]
];
declare function assert(value: unknown): asserts value;
