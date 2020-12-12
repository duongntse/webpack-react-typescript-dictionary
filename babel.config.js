module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript'
	],
	plugins: [
		[
			'@babel/plugin-transform-modules-commonjs',
			{ allowTopLevelThis: true }
		],
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
		'transform-async-to-generator',
		'@babel/plugin-transform-runtime'
	]
};
