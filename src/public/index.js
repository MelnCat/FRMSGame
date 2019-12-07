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
/******/ 		1: 0
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./test_area": [
		0,
		9,
		0
	],
	"./test_area.js": [
		3,
		7,
		2
	],
	"./test_area.ts": [
		0,
		9,
		0
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
webpackAsyncContext.id = 1;
module.exports = webpackAsyncContext;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/public/modules/defaults.ts
const wall = (...arr) => arr.reduce((p, c) => { p[c] = { wall: true }; return p; }, {});
console.log(wall(1, 2, 3));
const defaults = {
    bg: {
        ...wall(0)
    },
    fg: {
        ...wall(2, 3, 4, 5)
    }
};
;

// CONCATENATED MODULE: ./src/public/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });

// #region CLASSES
const gridSize = 5;
class Tile {
    constructor(id, options = {}, texture = id) {
        this.id = id;
        this.options = options;
        this.texture = texture;
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
}
const areaCache = {};
const player = {
    x: 3,
    y: 3,
    area: "",
    texId: 1
};
// #endregion
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const tileParser = (arr) => // [number: bg, number: fg, opts]
 arr.map(x => x.map(y => {
    if (isNumber(y))
        y = [y];
    const [background = 0, foreground = 0, options = {}] = y;
    return [new Tile(background, defaults.bg[background]), new Tile(foreground, Object.assign({}, defaults.fg[foreground], options))];
}));
const areaFileParser = (text) => text.split("\n").map(x => x.split(/\s+/).map(y => y.split(/:\s+/).map(z => Number.parseInt(z, 16))));
const importArea = async (name) => {
    if (areaCache[name])
        return areaCache[name];
    const areaRaw = await __webpack_require__(1)(`./${name}`);
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
    const { x, y } = player;
    const [surrounding, area] = await getSurrounding();
    for (const e of surrounding) {
        const elem = getGridElement(e.x, e.y);
        const fg = getForegroundElement(e.x, e.y);
        const plyr = getPlayerElement(e.x, e.y);
        elem.classList.remove("flipX");
        elem.classList.remove("flipY");
        fg.classList.remove("flipX");
        fg.classList.remove("flipY");
        const bgOpts = e.value[0].options;
        const fgOpts = e.value[1].options;
        if (!elem || !fg || !plyr)
            console.error(e.x, e.y);
        if (bgOpts.flip)
            elem.classList.add(`flip${bgOpts.flip}`);
        elem.style.backgroundImage = `url(./img/background/${e.value[0].texture}.png)`;
        if (fgOpts.flip)
            fg.classList.add(`flip${fgOpts.flip}`);
        fg.src = `./img/foreground/${e.value[1].texture}.png`;
        if (e.x === (Math.round(gridSize / 2) - 1) && e.y === (Math.round(gridSize / 2) - 1))
            plyr.src = `./img/player/${player.texId}.png`;
        else
            plyr.src = "";
    }
};
const startArea = async (starting = 0) => {
    const plane = await importArea(player.area);
    const center = plane.indexFlat.find(x => x.value.some(y => y.options.start === starting));
    if (!center)
        throw new Error(`Area "${name}" does not have a start.`);
    player.x = center.y;
    player.y = center.x;
};
const setArea = async (area) => {
    player.area = area;
    // // await loadArea();
};
window.onload = async () => {
    // #region
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
        const foreground = document.createElement("IMG");
        foreground.id = `grid-${i}-fg`;
        foreground.classList.add("fg");
        elem.append(foreground);
        const playerelem = document.createElement("IMG");
        playerelem.id = `grid-${i}-player`;
        playerelem.classList.add("player");
        elem.append(playerelem);
    }
    // > Tile init
    // #endregion
    await setArea("test_area");
    await startArea();
    await loadArea();
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
    const right = async () => {
        if (!await check("right"))
            return;
        player.x++;
        await loadArea();
    };
    const left = async () => {
        if (!await check("left"))
            return;
        player.x--;
        await loadArea();
    };
    const down = async () => {
        if (!await check("down"))
            return;
        player.y++;
        await loadArea();
    };
    const up = async () => {
        if (!await check("up"))
            return;
        player.y--;
        await loadArea();
    };
    let movable = true;
    window.addEventListener("keydown", async (event) => {
        if (!movable)
            return;
        movable = false;
        switch (event.code) {
            case "ArrowLeft":
            case "KeyA":
                await left();
                break;
            case "ArrowRight":
            case "KeyD":
                await right();
                break;
            case "ArrowUp":
            case "KeyW":
                await up();
                break;
            case "ArrowDown":
            case "KeyS":
                await down();
                break;
        }
        setTimeout(() => movable = true, 50);
    }, true);
};
var Util;
(function (Util) {
    Util.say = (text) => alert(text);
})(Util || (Util = {}));


/***/ })
/******/ ]);