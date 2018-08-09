const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env) => {
	const isDevBuild = !(env && env.prod);
	const extractCss = new ExtractTextPlugin("vendor/vendor.css");
	console.log(`Dev Environment:${isDevBuild}`);

	return [{
		mode: isDevBuild ? "development" : "production",
		stats: { modules: false },
		resolve: { extensions: [".js"] },
		entry: {
			vendor: [
				"bootstrap/dist/css/bootstrap.css",
				"font-awesome/css/font-awesome.css",
				"toastr/build/toastr.css",

				"bootstrap",
				"event-source-polyfill",
				"isomorphic-fetch",
				"jquery",
				"popper.js",
				"toastr",
				"vue",
				"vue-router",
			],
		},
		module: {
			rules: [
				{ test: /\.css(\?|$)/, use: extractCss.extract({ use: isDevBuild ? "css-loader" : "css-loader?minimize" }) },
				{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: [{ loader: "url-loader", options: { limit: 100000, name: "[hash].[ext]", outputPath: "vendor/", publicPath: "" } }] },
				// if less than 10 kb, add base64 encoded image to css. if more than 10 kb move to this folder in build using file-loader
			]
		},
		output: {
			path: path.join(__dirname, "wwwroot"),
			publicPath: "",
			filename: "vendor/[name].js",
			library: "[name]_[hash]"
		},
		plugins: [
			extractCss,
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				'window.jQuery': "jquery",
				Popper: ["popper.js", "default"],
			}), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
			new webpack.DllPlugin({
				path: path.join(__dirname, "wwwroot", "vendor", "[name]-manifest.json"),
				name: "[name]_[hash]"
			})
		].concat(isDevBuild ? [] : [
			new UglifyJsPlugin()
		])
	}];
};
