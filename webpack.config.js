var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	   devtool: 'source-map',   
	   mode: 'production',
	   entry: [
		  'webpack-dev-server/client?http://localhost:8080',
          APP_DIR + '/index.jsx'
		],	
	  performance: {
		  hints: false
	  },
	  output: {
			path: BUILD_DIR,
			publicPath: '/src/client/public',        
			filename: 'bundle.js',
			hotUpdateChunkFilename: 'hot/hot-update.js',
			hotUpdateMainFilename: 'hot/hot-update.json'
		},
		devServer: {
			historyApiFallback: {index:'/'},
			contentBase: BUILD_DIR
		},
		module : {
			rules : [
				{
					test : /\.jsx?/,
					include : APP_DIR,
					loader : 'babel-loader'
				}
			]
		},
		resolve: {
			extensions: [".js", ".jsx"]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
};

module.exports = config;