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
            async stand() {
                await index_1.moveSlow("down");
            }
        }
    },
    fg: {
        2: {
            wall: true,
            async use() {
                await index_1.speak("A simple table.");
                this.value[1].texture = 3;
                console.log(this);
            }
        },
        ...exports.applyObject({ wall: true, async use() { await index_1.speak("A comfy chair."); await index_1.speak("Too bad it's digital."); } }, 3, 4, 5, 6),
        ...exports.applyObject({ wall: true, async use() { await index_1.speak("A couple of lockers."); await index_1.speak("None of them are mine."); } }, 7, 8, 9),
        ...exports.applyObject({ wall: true, async use() { await index_1.speak("These lockers fell."); await index_1.speak("Hopefully no fragile items are inside."); } }, 10, 11),
    }
};
;
