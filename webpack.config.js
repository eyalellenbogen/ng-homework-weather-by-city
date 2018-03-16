"use strict";

const webpack = require("webpack"),
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	autoprefixer = require("autoprefixer"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	WebpackBuildNotifierPlugin = require("webpack-build-notifier"),
	failPlugin = require("webpack-fail-plugin");

var _package = require("./package.json");
var timestamp = new Date();
var build = process.env.BUILD_NUMBER;
var pkg = {
	banner: `${_package.name}@${_package.version} - ${timestamp.toISOString()} - build ${build}`,
	title: `${_package.name}@${_package.version}.${timestamp.toISOString().slice(0, 10).replace(/-/g, "")}${(build) ? "#" + build : ""}`
};

var config = {

	entry: {
		app: "./src/bootstrap.ts",
		vendor: ["angular", "jquery"]
	},

	output: {
		path: __dirname + "/dist",
		filename: "app.js"
	},

	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
		alias: {
			// "angular":"angular/angular.min.js",
			"jquery": "jquery/dist/jquery.min.js"
		}
	},

	module: {
		noParse: [
			//"angular/angular.min.js",
			//"jquery/dist/jquery.min.js"
		],

		preloaders: [{
			test: /\.ts$/,
			loader: "tslint-loader",
			exclude: /node_modules/
		}],

		loaders: [
			{
				test: /\.html$/,
				loader: "raw-loader",
			}, {
				test: /\.ts$/,
				loader: "ts-loader"
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!resolve-url-loader!less-loader")
			}, {
				test: /bootstrap-sass\/assets\/javascripts\//,
				loader: "imports-loader?jQuery=jquery"
			}, {
				test: /\.(woff2?|svg|ttf|eot)\?.*$/,
				loader: "file-loader"
			}, {
				test: /\.(woff2?|svg|ttf|eot)$/,
				loader: "url-loader?limit=10000"
			}, {
				test: /\.png$/,
				loader: "url-loader?limit=100000"
			}, {
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},

	postcss: function () {
		return [autoprefixer({
			browsers: ["last 3 versions"]
		})];
	},

	tslint: {
		emitErrors: false,
		failOnHint: false,
		formatter: "verbose",
		fileOutput: {
			dir: "./lint-results",
			clean: true,
			ext: "lint.xml"
		}
	},
	resolveUrlLoader: {
		fail: true,
		keepQuery: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.$": "jquery",
			"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin("app.css"),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.js",
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			filename: "./index.html",
			template: "./src/index.html",
			title: pkg.title,
			inject: true
		}),
		new webpack.BannerPlugin(pkg.banner),
		failPlugin
	],

	devtool: "source-map",
	devServer: {
		colors: true,
		progress: true,
		port: 8080,
		contentBase: "/src"
	}
};

if (process.env.BUILD_RELEASE == 1) {
	console.log("Build mode: RELEASE");
	config.tslint.formatter = "vso";
} else {
	console.log("Build mode: DEBUG");
	config.plugins.push(new WebpackBuildNotifierPlugin());
}

module.exports = config;
