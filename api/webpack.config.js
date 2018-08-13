const webpack = require("webpack");

const serverConfig = {
	entry: "./index.js",
	target: "node",
	output: {
		path: __dirname,
		filename: "server.js",
		libraryTarget: "commonjs2"
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				exclude: [
					/\.html$/,
				    /\.(js|jsx)$/,
				    /\.css$/,
				    /\.scss$/,
				    /\.json$/,
				    /\.bmp$/,
				    /\.gif$/,
				    /\.jpe?g$/,
				    /\.png$/,
				    /\.ejs$/,
				],
				loader: "file-loader",
				options: {
					name: "public/media/[name].[ext]",
					publicPath: url => url.replace(/public/, ""),
					emit: false
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "css-loader/locals",
					},
				]
			},
			{
				test: /jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: { 
					presets: ["es2015"] 
				}
			}
		]
	}
};

module.exports = [serverConfig];