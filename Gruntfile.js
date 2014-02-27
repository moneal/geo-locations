/*global module:false*/
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        settings: {
			distDir:	'dist'
		},
        jshint: {
            options: {
                'curly'     : true,
                'eqeqeq'    : true,
                'immed'     : true,
                'latedef'   : true,
                'newcap'    : true,
                'noarg'     : true,
                'sub'       : true,
                'undef'     : true,
                'boss'      : true,
                'eqnull'    : true,
                'node'      : true,
                'indent'    : 4,
                'quotmark'  : 'single',
                'globals' : {
                    'it'            : false,
                    'xit'           : false,
                    'describe'      : false,
                    'xdescribe'     : false,
                    'beforeEach'    : false,
                    'afterEach'     : false,
                    'expect'        : false,
                    'spyOn'         : false
                }
            },

            gruntfile: {
                src: 'Gruntfile.js'
            },
            spec: {
                src: ['spec/**/*.js']
            }
        },
        nodeunit: {
            files: ['test/**/*_test.js']
        },
        jasmine_node: {
			//verbose			: false,
			options: {
				specNameMatcher : 'Spec', // load only specs containing specNameMatcher
				projectRoot		: './spec',
				requirejs		: true,
				forceExit		: true
			},
			json: {
			}
        },
		jsonlint: {
			all: {
				src: [ '**/*.json', '!**/node_modules/**/*.json' ]
			},
			src: {
				src: [ 'src/**/*.json' ]
			},
			dist: {
				src: [ 'dist/**/*.json' ]
			}
		},
		clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        './dist/*',
                    ]
                }]
            },
        },
		copy: {
			json: {
				expand: true,
				cwd: 'src/',
				src: '**',
				dest: 'dist/'
			},
		},
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            spec_test: {
                files: '<%= jshint.spec.src %>',
                tasks: ['jshint:spec', 'jasmine_node']
            },
			dist_json: {
                files: '<%= jsonlint.dist.src %>',
                tasks: ['jsonlint:dist', 'jasmine_node']
			},
			src_json: {
                files: '<%= jsonlint.src.src %>',
                tasks: ['jsonlint:src', 'copy:json']
			}
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('test', ['jsonlint', 'jshint', 'jasmine_node']);

	grunt.registerTask('build', ['clean:dist', 'copy:json']);

};
