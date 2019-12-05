const path = require("path"); // eslint-disable-line
module.exports = [{
	entry: "./src/server.ts",
	module: {
		rules: [
		  {
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
		  },
		],
	  },
	  resolve: {
		extensions: [".tsx", ".ts", ".js"],
	  },
	  target: "node",
	  output: {
		filename: "server.js",
		path: path.resolve(__dirname, "dist/server"),
	  },
	  name: "node"
}, {
	entry: "./src/public/index.ts",
	module: {
		rules: [
		  {
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
		  },
		],
	  },
	  resolve: {
		extensions: [".tsx", ".ts", ".js"],
	  },
	  output: {
		filename: "index.js",
		path: path.resolve(__dirname, "src/public"),
	  },
	  name: "client",
	  optimization: {
		  // We no not want to minimize our code.
		  minimize: false
	  },
}];
