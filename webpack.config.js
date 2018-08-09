const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const bundleOutputDir = "./wwwroot";

module.exports = (env) => {
	const isDevBuild = !(env && env.prod);
	console.log(`Dev Environment:${isDevBuild}`);

	return [{
		mode: isDevBuild ? "development" : "production",
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: [ ".js", ".ts" ] },
        entry: { 'main': "./ClientApp/boot.ts" },
        module: {
            rules: [
                { test: /\.vue\.html$/, include: /ClientApp/, loader: "vue-loader", options: { loaders: { js: "awesome-typescript-loader?silent=true" } } },
                { test: /\.ts$/, include: /ClientApp/, use: "awesome-typescript-loader?silent=true" },
                { test: /\.css$/, use: isDevBuild ? [ "style-loader", "css-loader" ] : ExtractTextPlugin.extract({ use: "css-loader?minimize" }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: "url-loader?limit=25000" }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: "js/[name].js",
            publicPath: "js/"
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require("./wwwroot/vendor/vendor-manifest.json")
			}),
	        new VueLoaderPlugin()
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map", // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, "[resourcePath]") // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
			new UglifyJsPlugin(),
		    new ExtractTextPlugin("css/site.css")
			]
		)
    }];
};
