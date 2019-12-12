"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = (name, value, ...arr) => arr.reduce((p, c) => { p[c] = { [name]: value }; return p; }, {});
exports.wall = (...arr) => exports.apply("wall", true, ...arr);
exports.defaults = {
    bg: {
        ...exports.wall(0)
    },
    fg: {
        ...exports.wall(2, 3, 4, 5)
    }
};
;
