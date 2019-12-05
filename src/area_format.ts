const isNumber = (n: any): n is number => typeof n === "number";
(async() => {
	const args = process.argv.slice(2).join(" ");
	if (!args) throw new Error("No area provided.");
	const { area }: {area: TileResolvable[][]} = await import(`./public/areas/${args}`);
	console.log(area.map(x => x.map(y => { isNumber(y) ? y = [y] : null; return `${y[0]}:${y[1] ?? 0}`; }).join(" ")).join("\n"));
})().catch(console.error);
