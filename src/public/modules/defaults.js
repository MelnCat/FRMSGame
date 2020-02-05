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
        ...exports.applyObject({ wall: true, async use() { await index_1.converse("A comfy chair.", "Too bad it's digital."); } }, 3, 4, 5, 6),
        ...exports.applyObject({ wall: true, async use() { await index_1.converse("A couple of lockers.", "None of them are mine."); } }, 7, 8, 9),
        ...exports.applyObject({ wall: true, async use() { await index_1.converse("These lockers fell.", "Hopefully no fragile items are inside."); } }, 10, 11),
        12: {
            async use() { await index_1.converse("Looks like this locker door is about to break."); await index_1.sleep(1000); this.value[1].id = 13; await index_1.converse("Oops."); this.value[1].resetOptions(); this.value[1].options.use = async function use() { await index_1.converse("That was probably vandalism, but I don't care."); }; },
            wall: true
        },
        13: {
            async use() { await index_1.converse("Where did the locker door go?"); },
            wall: true
        },
        ...exports.applyObject({ wall: true, async use() { await index_1.converse("I can see the second floor.", "Hopefully nobody falls off.\nDying is illegal."); } }, 14, 15, 16, 17),
        ...exports.applyObject({ wall: true, async use() { await index_1.converse("Some debris.", "Probably fell from the ceiling."); } }, 18, 18.1, 18.2, 18.3),
    }
};
;
