"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.apply = (name, value, ...arr) => arr.reduce((p, c) => { p[c] = { [name]: value }; return p; }, {});
exports.applyObject = (obj, ...arr) => arr.reduce((p, c) => { p[c] = obj; return p; }, {});
exports.wall = (...arr) => exports.apply("wall", true, ...arr);
exports.defaults = {
    bg: {
        ...exports.wall(0),
        1: {
            stand() {
                this.value[0].texture = 2;
            }
        }
    },
    fg: {
        2: {
            wall: true,
            async use() {
                await index_1.speak("A simple table.");
                this.value[1].texture = 2;
                console.log(this);
            }
        },
        ...exports.applyObject({ wall: true, async use() { await index_1.speak("A comfy chair."); await index_1.speak("Too bad it's digital."); } }, 3, 4, 5, 6)
    }
};
;
