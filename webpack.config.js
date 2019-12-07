const path = require("path"); // eslint-disable-line
module.exports = [
	{
		entry: "./src/server.ts",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		target: "node",
		output: {
			filename: "server.js",
			path: path.resolve(__dirname, "dist/server")
		},
		name: "node"
	},
	{
		entry: "./src/public/index.ts",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: "style-loader" },
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
								modules: true,
								localIdentName: "[local]_[hash:base64:5]"
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
								config: {
									path: "postcss.config.js"
								}
							}
						},
						{
							loader: "sass-loader",
							options: { sourceMap: true }
						}
					]
				}
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "src/public")
		},
		name: "client",
		optimization: {
			// We no not want to minimize our code.
			minimize: false
		}
	}
];
