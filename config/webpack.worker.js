'use strict';

const webpack = require('webpack');
const path = require('path');
const helper = require('./helpers');
const WatchIgnorePlugin = require('webpack/lib/WatchIgnorePlugin');

module.exports = {
	entry: {
		'worker': './src/workers/worker.setup.ts'
	},
	output: {
		path: helper.root('src/workers'),
		filename: "[name].js",
		sourceMapFilename: '[name].map',
	},
	devtool: 'source-map',
	resolve: {

		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['.ts', '.js', '.json'],

		// An array of directory names to be resolved to the current directory
		modules: [
			helper.root('src'),
			helper.root('src/app'),
			helper.root('node_modules')
		],
		alias: {
			//'lodash': helper.root('node_modules/lodash/index.js')
		},

	},
	module: {
		rules: [
			/*
			 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
			 *
			 * See: https://github.com/s-panferov/awesome-typescript-loader
			 */
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				exclude: [/\.(spec|e2e)\.ts$/]
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					// these packages have problems with their sourcemaps
					helper.root('node_modules/rxjs'),
					helper.root('node_modules/@angular'),
				]
			},
			/*
			 * Json loader support for *.json files.
			 *
			 * See: https://github.com/webpack/json-loader
			 */
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new WatchIgnorePlugin([
			helper.root('src/workers/*.js')
		]),
	],
	node: {
		global: true,
		crypto: 'empty',
		process: false,
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};