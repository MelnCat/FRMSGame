"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.apply = (name, value, ...arr) => arr.reduce((p, c) => { p[c] = { [name]: value }; return p; }, {});
exports.applyObject = (obj, ...arr) => arr.reduce((p, c) => { p[c] = obj; return p; }, {});
exports.wall = (...arr) => exports.apply("wall", true, ...arr);
exports.defaults = {
    bg: {
        ...exports.wall(0)
    },
    fg: {
        2: {
            wall: true,
            use() {
                index_1.speak("A simple table.");
            }
        },
        ...exports.applyObject({ wall: true, async use() { await index_1.speak("A comfy chair."); await index_1.speak("Too bad it's digital."); } }, 3, 4, 5, 6)
    }
};
;
