/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".index.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/public/modules/defaults.ts

const apply = (name, value, ...arr) => arr.reduce((p, c) => { p[c] = { [name]: value }; return p; }, {});
const applyObject = (obj, ...arr) => arr.reduce((p, c) => { p[c] = obj; return p; }, {});
const wall = (...arr) => apply("wall", true, ...arr);
const defaults = {
    bg: {
        ...wall(0),
        1: {
            async stand() {
                await moveSlow("down");
            }
        }
    },
    fg: {
        2: {
            wall: true,
            async use() {
                await speak("A simple table.");
                this.value[1].texture = 3;
                console.log(this);
            }
        },
        ...applyObject({ wall: true, async use() { await converse("A comfy chair.", "Too bad it's digital."); } }, 3, 4, 5, 6),
        ...applyObject({ wall: true, async use() { await converse("A couple of lockers.", "None of them are mine."); } }, 7, 8, 9),
        ...applyObject({ wall: true, async use() { await converse("These lockers fell.", "Hopefully no fragile items are inside."); } }, 10, 11),
        12: {
            async use() { await converse("Looks like this locker door is about to break."); await sleep(1000); this.value[1].id = 13; await converse("Oops."); this.value[1].resetOptions(); this.value[1].options.use = async function use() { await converse("That was probably vandalism, but I don't care."); }; },
            wall: true
        },
        13: {
            async use() { await converse("Where did the locker door go?"); },
            wall: true
        },
        ...applyObject({ wall: true, async use() { await converse("I can see the second floor.", "Hopefully nobody falls off.\nDying is illegal."); } }, 14, 15, 16, 17),
        ...applyObject({ wall: true, async use() { await converse("Some debris.", "Probably fell from the ceiling."); } }, 18, 18.1, 18.2, 18.3),
    }
};
;

// CONCATENATED MODULE: ./src/public/modules/names.ts
const names = {
    bg: {
        0: "blank",
        1: "grass",
        2: "grass_flowery",
        3: "bricks",
        4: "school_plank",
        5: "school_plank2",
        6: "gradient_top",
        7: "gradient_bottom",
        8: "school_wall_up",
    },
    fg: {
        0: "blank",
        1: "test_object",
        2: "table",
        3: "chair_down",
        4: "chair_right",
        5: "chair_left",
        6: "chair_up",
        7: "locker_right",
        8: "locker_double",
        9: "locker_left",
        10: "locker_fallA",
        11: "locker_fallB",
        12: "locker_hang",
        13: "locker_missing",
        14: "floor3_railing_horizontal",
        15: "floor3_railing_turn_right",
        16: "floor3_railing_vertical",
        17: "floor3_railing_turn_left",
        18: "fallen_debrisA",
        18.1: "fallen_debrisB",
        18.2: "fallen_debrisC",
        18.3: "fallen_debrisD",
    }
};

// CONCATENATED MODULE: ./src/public/modules/constants.ts
/* harmony default export */ var constants = ({
    debug: true
});

// CONCATENATED MODULE: ./src/public/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typewrite", function() { return typewrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEWLINE", function() { return NEWLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "say", function() { return say; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "speak", function() { return speak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "converse", function() { return converse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "player", function() { return player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadArea", function() { return loadArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setArea", function() { return setArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move", function() { return move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveSlow", function() { return moveSlow; });



const URLExists = (url) => {
    try {
        const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        request.open("GET", url, false);
        request.send();
        return request.status !== 404;
    }
    catch {
        return false;
    }
};
const genNoCSSURL = (path, id, ext) => `./img/${path}/${id}${ext ? "." : ""}${(ext !== null && ext !== void 0 ? ext : "")}`;
const genURL = (path, id, ext) => `url(${genNoCSSURL(path, id, ext)})`;
const genFullURL = (path, id) => `${genURL(path, id, "gif")}, ${genURL(path, id, "png")}`;
const preloadURL = (path, id, ext) => new Promise(res => { try {
    if (!URLExists(genNoCSSURL(path, id, ext)))
        return;
    const img = new Image();
    img.src = genNoCSSURL(path, id, ext);
    img.onload = res;
}
catch { } });
// eslint-disable-next-line no-sequences
const preloadFullURL = async (path, id) => { await preloadURL(path, id, "gif"), await preloadURL(path, id, "gif"); };
const ZERO_WIDTH = "​";
const trycatch = (func, no, yes) => {
    try {
        const y = func();
        return yes || y;
    }
    catch (err) {
        return no;
    }
};
const store = new Proxy({}, { get(t, x) {
        return trycatch(() => JSON.parse(localStorage[x]), localStorage[x]);
    }, set(t, x, y) {
        return localStorage[x] = trycatch(() => JSON.stringify(y), y);
    } });
let convo = false;
setInterval(() => {
    const speechbox = document.getElementById("speechbox");
    if (!speechbox)
        return;
    const box = document.getElementById("box");
    if (!box)
        return;
    if (box.innerHTML)
        speechbox.style.visibility = "visible";
    else
        speechbox.style.visibility = "hidden";
});
const untilTrue = (func) => new Promise(res => {
    const inter = setInterval(async () => await func() && (res(true), clearInterval(inter)));
});
const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
const typewrite = async (id, string, persist, breakLoop = async () => false) => {
    const elem = id instanceof HTMLElement ? id : document.getElementById(id);
    if (!elem)
        return elem;
    convo = true;
    elem.innerText = ZERO_WIDTH;
    for (const i of string) {
        if (!await (breakLoop instanceof Promise ? breakLoop : breakLoop()))
            await sleep(40);
        elem.innerHTML += i === "\n" ? "<br />" : i;
    }
    ;
    await untilTrue(persist instanceof Promise ? () => persist : persist);
    elem.innerText = ZERO_WIDTH;
    convo = false;
    return setTimeout(() => elem.innerHTML === ZERO_WIDTH ? elem.innerHTML = "" : null, 250);
};
const waitUntil = (...keys) => new Promise(res => {
    const ev = (event) => keys.some(x => x === event.code) && (window.removeEventListener("keypress", ev), res(event.code));
    window.addEventListener("keypress", ev);
});
const onKey = (func, ...keys) => {
    const l = (event) => keys.some(x => x === event.code) && func(event, () => window.removeEventListener("keydown", l));
    window.addEventListener("keydown", l);
};
const NEWLINE = Symbol("NEWLINE");
const say = (elem, text) => {
    const eleme = typeof elem === "string" ? document.getElementById(elem) : elem;
    if (text === NEWLINE && eleme)
        return Promise.resolve(eleme.innerHTML += "<br>");
    else if (text === NEWLINE)
        return Promise.resolve();
    let pressed = 0;
    onKey((e, stop) => { var _a; pressed = Date.now() + 100; (_a = stop) === null || _a === void 0 ? void 0 : _a(); }, "Space");
    const getPressed = async () => pressed;
    let pressed2 = false;
    let done = false;
    onKey((e, stop) => { var _a; return pressed <= Date.now() || done ? (pressed2 = true, (_a = stop) === null || _a === void 0 ? void 0 : _a()) : ""; }, "Space");
    const getPressed2 = async () => { done = true; return pressed2; };
    typewrite(elem, text, getPressed2, getPressed);
    return new Promise(res => untilTrue(() => pressed2).then(() => setTimeout(res, 100)));
};
const speak = (text) => new Promise(res => setTimeout(() => say("box", text).then(res), 100));
const converse = async (...texts) => {
    for (const text of texts)
        await speak(text);
};
// #endregion
// #region CLASSES]
const createElement = (type, func = () => true) => {
    const e = document.createElement(type);
    func.call(e, e);
    return e;
};
const gridSize = 5;
class public_Tile {
    constructor(id, options = {}, _texture) {
        this.id = id;
        this.options = options;
        this._texture = _texture;
    }
    get texture() {
        var _a;
        return _a = this._texture, (_a !== null && _a !== void 0 ? _a : this.id);
    }
    set texture(x) {
        this._texture = x;
    }
    resetOptions() {
        this.options = defaults.fg[this.id];
    }
}
class Plane {
    constructor(arr) {
        this.arr = arr;
    }
    get indexNoFlat() {
        return Array.from(this.arr.entries()).map(([i, v]) => Array.from(v.entries()).map(([j, k]) => ({ x: i, y: j, value: k })));
    }
    get indexFlat() {
        return this.indexNoFlat.flat();
    }
    get(x, y) {
        var _a, _b;
        return ((_b = (_a = this.indexNoFlat) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) || null;
    }
    set(x, y, newVal) {
        return this.arr[y][x] = newVal;
    }
    getSurrounding(x, y) {
        const center = this.get(x, y);
        if (!center)
            return center;
        return {
            center,
            up: this.get(x, y - 1),
            left: this.get(x - 1, y),
            down: this.get(x, y + 1),
            right: this.get(x + 1, y)
        };
    }
    getArea(startX, startY, endX, endY) {
        return this.indexNoFlat.slice(Math.max(0, startY), endY + 1).map(x => x.slice(Math.max(0, startX), endX + 1));
    }
    findValue(val) {
        return this.indexFlat.find(x => x.value === val);
    }
    get width() {
        return this.arr.sort((a, b) => b.length - a.length)[0].length;
    }
    get height() {
        return this.arr.length;
    }
    get center() {
        var _a;
        return (_a = this.arr[Math.floor(this.width / 2)]) === null || _a === void 0 ? void 0 : _a[Math.floor(this.height / 2)];
    }
    *[Symbol.iterator]() {
        for (const x of this.indexFlat)
            yield x;
    }
    toJSON() {
        return this.arr;
    }
}
const areaCache = {};
const player = {
    x: 3,
    y: 3,
    area: "",
    texId: 1,
    look: "down"
};
const end = Date.now() + 1000;
const loadInterval = setInterval(() => {
    if (end < Date.now())
        clearInterval(loadInterval);
    if (localStorage.player)
        Object.assign(player, JSON.parse(localStorage.player));
    if (localStorage.cached) {
        const cached = JSON.parse(localStorage.cached);
        for (const i in cached) {
            const area = areaCache[i];
            const cach = cached[i];
            if (!(cach && area))
                continue;
            area.arr.map(x => x.map(y => {
                // eslint-disable-next-line max-nested-callbacks
                y.map(z => ["texture", "id"].map(a => z[a]));
            }));
        }
        ;
    }
    ;
});
console.log(player);
// #endregion
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const tileParser = (arr) => // [number: bg, number: fg, opts]
 arr.map(x => x.map(y => {
    if (!(y instanceof Array))
        y = [y];
    if (y[0] instanceof Function)
        y[0] = y[0]();
    if (y[1] instanceof Function)
        y[1] = y[1]();
    const [background = 0, foreground = 0, options = {}] = y;
    return [new public_Tile(background, defaults.bg[background]), new public_Tile(foreground, Object.assign({}, defaults.fg[foreground], options))];
}));
const areaFileParser = (text) => text.split("\n").map(x => x.split(/\s+/).map(y => y.split(/:\s+/).map(z => Number.parseInt(z, 16))));
const importArea = async (name) => {
    if (areaCache[name])
        return areaCache[name];
    const areaRaw = await __webpack_require__(3)(`./${name}`);
    const empty = Array(areaRaw.area[0].length + 4).fill(0);
    const area = [empty, empty, ...areaRaw.area.map((x) => [0, 0, ...x, 0, 0]), empty, empty];
    const file = tileParser(area);
    const plane = new Plane(file);
    areaCache[name] = plane;
    return plane;
};
const toN = (x, y) => (x * gridSize) + y;
const getGridElement = (x, y) => document.getElementById(`grid-${toN(x, y)}`);
const getForegroundElement = (x, y) => document.getElementById(`grid-${toN(x, y)}-fg`);
const getPlayerElement = (x, y) => document.getElementById(`grid-${toN(x, y)}-player`);
const getSurrounding = async () => {
    const plane = await importArea(player.area);
    const area = plane.getArea(player.x - 2, player.y - 2, player.x + 2, player.y + 2);
    return [new Plane(area.map(k => k.map(z => z.value))).indexFlat, area];
};
const getDirect = async () => {
    const plane = await importArea(player.area);
    return plane.getSurrounding(player.x, player.y);
};
const loadArea = async () => {
    const [surrounding, area] = await getSurrounding();
    for (const e of surrounding) {
        const elem = getGridElement(e.x, e.y);
        const fg = getForegroundElement(e.x, e.y);
        const plyr = getPlayerElement(e.x, e.y);
        elem.classList.remove("flipX");
        elem.classList.remove("flipY");
        elem.onerror = () => console.log("oh no");
        fg.classList.remove("flipX");
        fg.classList.remove("flipY");
        fg.onerror = () => console.log("oh no");
        const bgOpts = e.value[0].options;
        const fgOpts = e.value[1].options;
        if (!elem || !fg || !plyr)
            console.error(e.x, e.y);
        if (bgOpts.flip)
            elem.classList.add(`flip${bgOpts.flip}`);
        elem.style.backgroundImage = genFullURL("background", e.value[0].texture);
        if (fgOpts.flip)
            fg.classList.add(`flip${fgOpts.flip}`);
        // // fg.classList.add(`fg.${e.value[1].texture}`);
        fg.style.backgroundImage = genFullURL("foreground", e.value[1].texture);
        if (e.x === (Math.round(gridSize / 2) - 1) && e.y === (Math.round(gridSize / 2) - 1))
            plyr.style.backgroundImage = genFullURL("player", player.texId);
        else
            plyr.style.backgroundImage = "";
        if (constants.debug)
            elem.title = `BG: ${e.value[0].id} ${names.bg[e.value[0].id]}\nFG: ${e.value[1].id} ${names.fg[e.value[1].id]}`;
    }
};
const setArea = async (area, id = 0) => {
    player.area = area;
    const start = await importArea(area);
    const startArea = start.indexFlat.find(x => x.value[1].options.start === id);
    if (!startArea)
        throw new Error(`No startarea for ${area}`);
    player.x = startArea.x;
    player.y = startArea.y;
    await loadArea();
};
setInterval(loadArea, 100);
setTimeout(() => setInterval(() => {
    localStorage.player = JSON.stringify(player);
    localStorage.cached = JSON.stringify(areaCache);
}, 100), 1000);
const startArea = async (starting = 0) => {
    const plane = await importArea(player.area);
    const center = plane.indexFlat.find(x => x.value.some(y => y.options.start === starting));
    if (!center)
        throw new Error(`Area "${name}" does not have a start.`);
    player.x = center.y;
    player.y = center.x;
};
const check = async (look) => {
    const area = await importArea(player.area);
    const surr = await getDirect();
    if (!surr || !surr[look])
        return false;
    const { [look]: { value: [{ options: bgOptions }, { options: fgOptions }] } } = surr;
    if (bgOptions.wall || fgOptions.wall)
        return false;
    return true;
};
const move = async (direction) => {
    var _a, _b;
    const func = { left: () => player.x--, up: () => player.y--, down: () => player.y++, right: () => player.x++ }[direction];
    player.look = direction;
    if (!await check(direction))
        return;
    func();
    const plane = await importArea(player.area);
    const standed = plane.get(player.x, player.y);
    const fg = standed.value[1];
    if (fg.options.disabled)
        return;
    await ((_a = fg.options.stand) === null || _a === void 0 ? void 0 : _a.call(standed, fg.options.data, null));
    const bg = standed.value[0];
    await ((_b = bg.options.stand) === null || _b === void 0 ? void 0 : _b.call(standed, fg.options.data, null));
    await loadArea();
};
const moveSlow = (direction) => new Promise(res => setTimeout(() => res(move(direction)), 200));
window.onload = async () => {
    // #region
    // const onKey = (func: (event?: KeyboardEvent) => any, ...keys: string[]) => window.addEventListener("keydown", event => keys.some(x => x === event.code) && func(event));
    const uuidv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    let id = localStorage.getItem("save-id");
    if (!id) {
        id = uuidv4();
        localStorage.setItem("save-id", id);
    }
    const save = async () => {
        const data = {
            player: {
                x: player.x,
                y: player.y
            }
        };
        await fetch("/api/saves", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };
    save();
    const ctn = document.getElementById("grid");
    for (let i = 0; i < (gridSize ** 2); i++) {
        const elem = document.createElement("DIV");
        ctn.append(elem);
        elem.classList.add("grid-item");
        elem.id = `grid-${i}`;
        const foreground = document.createElement("DIV");
        foreground.id = `grid-${i}-fg`;
        foreground.classList.add("fg");
        foreground.onerror = console.log;
        elem.append(foreground);
        const playerelem = document.createElement("DIV");
        playerelem.id = `grid-${i}-player`;
        playerelem.classList.add("player");
        elem.append(playerelem);
    }
    // #endregion
    const speechbox = document.createElement("div");
    speechbox.id = "speechbox";
    ctn.append(speechbox);
    const box = document.createElement("p");
    box.id = "box";
    speechbox.append(box);
    const areaDiv = document.createElement("div");
    areaDiv.id = "areaDiv";
    ctn.append(areaDiv);
    const inventory = document.getElementById("inv");
    for (let i = 0; i < 5; i++) {
        const e = document.createElement("p");
        e.style.backgroundColor = "red";
        inventory.append(e);
    }
    // > Tile init
    setArea("school_hallway1");
    await startArea();
    await loadArea();
    let movable = true;
    window.addEventListener("keydown", async (event) => {
        var _a;
        if (!movable || convo)
            return;
        movable = false;
        switch (event.code) {
            case "ArrowLeft":
            case "KeyA":
                await move("left");
                break;
            case "ArrowRight":
            case "KeyD":
                await move("right");
                break;
            case "ArrowUp":
            case "KeyW":
                await move("up");
                break;
            case "ArrowDown":
            case "KeyS":
                await move("down");
                break;
            case "Enter":
            case "Space":
                const plane = await importArea(player.area);
                const surrounding = plane.getSurrounding(player.x, player.y);
                const fg = surrounding[player.look].value[1];
                if (fg.options.disabled)
                    return;
                await ((_a = fg.options.use) === null || _a === void 0 ? void 0 : _a.call(surrounding[player.look], fg.options.data, null));
                await loadArea();
                break;
        }
        setTimeout(() => movable = true, 50);
    }, true);
    (async () => {
        const invisible = document.createElement("DIV");
        invisible.style.visibility = "none";
        document.body.append(invisible);
        try {
            for (const name of Object.keys(names.fg)) {
                const e = document.createElement("DIV");
                e.style.backgroundImage = genFullURL("foreground", name);
                e.onerror = console.log;
                invisible.append(e);
            }
            ;
            for (const name of Object.keys(names.bg)) {
                try {
                    const e = document.createElement("DIV");
                    e.style.backgroundImage = genFullURL("background", name);
                    invisible.append(e);
                }
                catch { }
            }
            ;
        }
        catch { }
    })().catch();
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./school_hallway1": [
		0,
		9,
		0
	],
	"./school_hallway1.js": [
		4,
		7,
		3
	],
	"./school_hallway1.ts": [
		0,
		9,
		0
	],
	"./test_area": [
		1,
		9,
		1
	],
	"./test_area.js": [
		5,
		7,
		4
	],
	"./test_area.ts": [
		1,
		9,
		1
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[2]).then(function() {
		return __webpack_require__.t(id, ids[1])
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 3;
module.exports = webpackAsyncContext;

/***/ })
/******/ ]);