/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		// Compile all .scss files.
		sass: {
			dist: {
				options: {
					require: 'susy',
					sourcemap: 'none',
					includePaths: ['node_modules/susy/sass', 'node_modules'].concat( require( 'node-bourbon' ).includePaths )
				},
				files: [{
					'style.css': 'style.scss',
					'style-editor.css': 'style-editor.scss',
					'bootstrap.css': 'bootstrap.scss',
					'gfgb.css': 'gfgb.scss',
				}]
			}
		},

		// Watch changes for assets.
		watch: {
			css: {
				files: [
					'style.scss',
					'style-editor.css',
					'bootstrap.scss',
					'gfgb.scss',
				],
				tasks: [
					'sass'
				]
			}
		},

		// RTLCSS
		rtlcss: {
			options: {
				config: {
					swapLeftRightInUrl: false,
					swapLtrRtlInUrl: false,
					autoRename: false,
					preserveDirectives: true
				}
			},
			main: {
				expand: true,
				ext: '-rtl.css',
				src: [
					'style.css'
				]
			}
		},

		compress: {
			main: {
				options: {
					archive: 'release/deli.zip',
					level: 5,
				},
				files: [
					{src: ['images/**']},
					{src: ['inc/**']},
					{src: ['languages/**']},
					{src: ['shortcode/**']},
					{src: ['*.php']},
					{src: ['*.css']},
					{src: ['quiz.js']},
					{src: ['changelog.txt']},
					{src: ['README.md']},
					{src: ['readme.txt']},
					{src: ['screenshot.png']},
				],
			},
		},
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-rtlcss' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	// Register tasks
	grunt.registerTask( 'default', [
		'css',
	]);

	grunt.registerTask( 'css', [
		'sass',
		'rtlcss'
	] );

	grunt.registerTask( 'build', [
		'css',
		'compress',
	] );
};