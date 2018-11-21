var webpack = require('webpack');

const config = {
    entry: {
		simulatelog : './simulatelog.js'
    },
    output: {
        filename: '[name].min.js',
    },
    mode: 'production',
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				include: __dirname + '/',
				use:{
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
    }
}

module.exports = config;