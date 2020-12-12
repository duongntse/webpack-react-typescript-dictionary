const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = (env) => {
	const manifestOptions = {
		seed: {
			name: 'Dictionary Extension',
			version: '1.0',
			description:
				'Build a dictionary to search for word, then it can translate, read and display related images... abc',
			permissions: ['activeTab', 'storage', 'tts'],
			manifest_version: 2,
			content_security_policy: "script-src 'self'; object-src 'self' ",
			web_accessible_resources: ['content.css', '*.png', '*.gif'],
			background: {
				scripts: ['background.js'],
			},
			content_scripts: [
				{
					all_frames: true,
					js: ['content.js'],
					matches: ['<all_urls>'],
					run_at: 'document_end',
				},
			],
		},
		generate: (seed, files, entrypoints) =>
			files.reduce((manifest, { name, path }) => {
				const matchPtn = /icon\w+\.png/g;
				if (path.match(matchPtn)) {
					return {
						...manifest,
						icons: {
							'128': path,
						},
						browser_action: {
							default_popup: 'popup.html',
							default_icon: path,
						},
					};
				}
				return { ...manifest };
			}, seed),
	};
	return {
		devtool: 'inline-cheap-module-source-map', //'source-map'
		entry: {
			content: path.resolve(APP_PATH, 'extension', 'src', 'content.tsx'),
			popup: path.resolve(APP_PATH, 'extension', 'src', 'popup.tsx'),
			background: path.resolve(APP_PATH, 'extension', 'background.ts'),
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
		},

		resolve: {
			alias: {
				root: path.resolve(__dirname),
				typings: path.resolve(__dirname, 'typings'),
				src: path.resolve(APP_PATH),
				extension: path.resolve(APP_PATH, 'extension'),
				giphy: path.resolve(APP_PATH, 'components', 'giphy'),
				ldoce: path.resolve(APP_PATH, 'components', 'ldoce'),
				messages: path.resolve(APP_PATH, 'components', 'messages'),
				api: path.resolve(APP_PATH, 'services', 'api'),
				utils: path.resolve(APP_PATH, 'services', 'utils'),
			},
			modules: ['src', 'node_modules'],
			extensions: ['.ts', '.tsx', '.js', '.json', '.png', '.gif', '.jpg'],
		},

		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					loader: 'file-loader?name=public/img/[name][hash].[ext]',
					exclude: /node_modules/,
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
					exclude: /node_modules/,
				},
			],
		},

		plugins: [
			// To strip all locales except “en”
			new MomentLocalesPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				template: path.join(APP_PATH, 'index.html'),
			}),
			new HtmlWebpackPlugin({
				title: 'Dictionary Extension',
				filename: 'popup.html',
				template: path.join(
					APP_PATH,
					'extension',
					'pages',
					'popup.html'
				),
				chunks: ['popup'],
			}),
			new ForkTsCheckerWebpackPlugin(),
			new ManifestPlugin(manifestOptions),
			new Dotenv(),
		],
	};
};
