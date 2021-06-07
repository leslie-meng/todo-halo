const { resolve } = require('path');
module.exports = (env) => {
	return {
		entry: ['babel-polyfill', './client/index.js'],
		output: {
			path: __dirname,
			filename: './public/bundle.js',
		},
		target: 'node',
		mode: 'development',
		context: __dirname,
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx'],
			fallback: { util: require.resolve('util/') },
		},
		module: {
			rules: [
				{
					test: /jsx?$/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
							},
						},
					],
				},
			],
		},
	};
};
