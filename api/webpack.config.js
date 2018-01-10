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
      server: './index'
		},

		output: {
			path: path.resolve('../build'),
			filename: '[name].bundle.js'
		},

		resolve: {
			modules: ['node_modules'],
			alias: { }
		},

		module: {
			rules: [{
				test: /\.jsx?$/i,
				use:[{
					loader: 'babel-loader',
					options: {
						presets: [
							"env",
							// "es2015",
							// "stage-0"
						],
						plugins: [
							["transform-object-rest-spread"]
						]
					}
				}]
			}]
		}
	}

	return config
}
