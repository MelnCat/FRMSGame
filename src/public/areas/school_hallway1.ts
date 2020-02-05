import { speak, player, move } from "../index";
const r = () => Math.round(Math.random()) + 4;
const f: t = [r, 17];
const e: t = [r, 14];
const g: t = [r, 15];
const h: t = [r, 16];
const s: t = [3, 0, { start: 0 }];
const l1: t = [r, 9];
const l2: t = [r, 8];
const l3: t = [r, 7];
const a: {[ee: string]: t} = { 1: [r, 18], q: [r, 18.1], w: [r, 18.2], e: [r, 18.3] };
/*  eslint-disable  no-irregular-whitespace  */
/*  eslint-disable  no-multi-spaces,  comma-spacing  */
export  const  area:  TileResolvable[][]  =  [
	[r,  r,  h,  6,  6,  6,  6,  6,  6,  6,  6,  h,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  h,  7,  7,  7,  7,  7,  7,  7,  7,  h,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  h,  6,  6,  6,  6,  6,  6,  6,  6,  h,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  h,  7,  7,  7,  7,  7,  7,  7,  7,  h,  r,  r,  r,  s,  r,  r,  r,  r,  r,  r],
	[r,  r,  h,  6,  6,  6,  6,  6,  6,  6,  6,  h,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  f,  e,  e,  e,  e,  e,  e,  e,  e,  g,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  r,  r,  r,  r,a[1],a.q ,r,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r,  r],
	[r,  r,  r,  r,  r,  r, a.w,a.e ,r,  r,  r,  r,  r,  l1 ,l2 ,l2 ,l2 ,l2 ,l2 ,l2 ,l2, r],
];
