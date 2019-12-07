"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wall = (...arr) => arr.reduce((p, c) => { p[c] = { wall: true }; return p; }, {});
console.log(exports.wall(1, 2, 3));
exports.defaults = {
    bg: {
        ...exports.wall(0)
    },
    fg: {
        ...exports.wall(2, 3, 4, 5)
    }
};
;
