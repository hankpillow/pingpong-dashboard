const path = require('path')
const webpack = require('webpack')

module.exports = function(env) {

	env = env || process.env.NODE_ENV || 'production'

	if (['production','development'].indexOf(env) === -1) {
		console.error(`unexpected env:${env} name`)
		process.exit(1)
	}

	let isDev = env === 'development'

	let config = {

		entry: {
			dashboard: './src'
		},

		output: {
			path: path.resolve('./'),
			filename: '[name].bundle.js'
		},

		resolve: {
			modules: ['node_modules'],
			alias: {
				modules: path.resolve(__dirname + '/src/modules'),
				stores: path.resolve(__dirname + '/src/stores'),
				components: path.resolve(__dirname + '/src/components'),
				insights: path.resolve(__dirname + '/src/components/insights')
			}
		},

		module: {
			rules: [{
					test: /\.js$/,
					enforce: 'pre',
					exclude: /node_modules/,
					use: [ {
						loader: 'eslint-loader',
						options: {
							failOnWarning: false,
							failOnError: false
						}
					}]
				},{
				test: /\.jsx?$/i,
				use:[{
					loader: 'babel-loader',
					options: {
						presets: [
							"env",
							"es2015",
							"stage-0"
						],
						plugins: [
							["transform-object-rest-spread"],
							['transform-react-jsx', {pragma: 'h'}]
						]
					}
				}]
			}]
		},

		plugins: [
			new webpack.NoEmitOnErrorsPlugin()
		]
	}

	if (isDev){
		config.devtool = 'source-map',
		config.devServer = {
			contentBase: path.join(__dirname),
			compress: false,
			proxy: {
				'/api': {
					target: 'http://localhost:8000',
					secure: false
				}
			}
		}
	} else {
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({
			compress: true,
			sourceMap: false
		}))
	}
	return config
}
