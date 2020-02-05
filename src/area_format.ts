import { Agent } from "http";

const isNumber = (n: any): n is number => typeof n === "number";
(async() => {
	const runOrCall = <T>(arg: T | CallableFunction) => arg instanceof Function ? arg() : arg;
	const args = process.argv.slice(2).join(" ");
	if (!args) throw new Error("No area provided.");
	const { area }: {area: TileResolvable[][]} = await import(`./public/areas/${args}`);
	console.log(area.map(x => x.map(y => { !(y instanceof Array) ? y = [y] : null; return `${runOrCall(y[0])}:${runOrCall(y[1]) ?? 0}`; }).join(" ")).join("\n"));
})().catch(console.error);
