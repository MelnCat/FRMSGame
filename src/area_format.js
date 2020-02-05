"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumber = (n) => typeof n === "number";
(async () => {
    const runOrCall = (arg) => arg instanceof Function ? arg() : arg;
    const args = process.argv.slice(2).join(" ");
    if (!args)
        throw new Error("No area provided.");
    const { area } = await Promise.resolve().then(() => __importStar(require(`./public/areas/${args}`)));
    console.log(area.map(x => x.map(y => { var _a; !(y instanceof Array) ? y = [y] : null; return `${runOrCall(y[0])}:${_a = runOrCall(y[1]), (_a !== null && _a !== void 0 ? _a : 0)}`; }).join(" ")).join("\n"));
})().catch(console.error);
