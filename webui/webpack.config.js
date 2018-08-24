const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const nodeExternals = require('webpack-node-externals');


const whitelist = [
	'react', 
	'react-router-dom',
	'isomorphic-fetch',
	'react-dom',
	'redux',
	'react-redux',
	'bootstrap',
	'jquery'
]

const browserConfig = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
    /*externals: [nodeExternals({
    	whitelist: whitelist
    })], */
	entry: [
		"./src/browser/index.js",
		"./src/scss/index.scss"
	],
	output: {
		path: __dirname,
		filename: "./public/bundle.js"
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
					publicPath: url => url.replace(/public/, "")
				}
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader",
						},
				        {
				            loader: "sass-loader"
				        }
					]
				})
			},
			{
				test: /jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: { 
					presets: ["es2015", "react"] 
				},
			},
			{
				test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: "url-loader?limit=100000",
				options: {
					name: "public/media/[name].[ext]",
					publicPath: url => url.replace(/public/, "")
				}
			}
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "public/css/[name].css"
		})
	]
};

const serverConfig = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
    /*externals: [nodeExternals({
    	whitelist: whitelist
    })],*/
	entry: "./src/server/index.js",
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
					presets: ["es2015", "react"] 
				}
			}
		]
	}
};

module.exports = [browserConfig, serverConfig];