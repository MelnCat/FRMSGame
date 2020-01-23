/* eslint-disable no-multi-spaces, comma-spacing */
import { speak, player, move } from "../index";
const r = (): number => Math.round(Math.random()) + 4;
export const area: TileResolvable[][] = [
	[r(), r(), [r(), 10] , [r(), 11] , [r(), 8]  , [r(), 8]  , [r(), 8]  , [r(), 8]  , [r(), 8]  , [r(), 9]  , r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), [3, 0, { start: 0 }], r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
	[r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
];
