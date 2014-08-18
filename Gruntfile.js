module.exports = function (grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        },
 
        clean: {
            all: ['dist', '.tmp'],
            tmp: ['.tmp']
        },

        html2js: {
            options: {
                base: 'app',
                module: 'ngform-templates',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: [
                    'app/partials/create.html',
                    'app/partials/directive-templates/**/*.html'
                ],
                dest: '.tmp/templates.js'
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'app/less/',
                src: '*.less',
                dest: 'dist/less/',
                flatten: true,
                filter: 'isFile'
            }
        },

        concat: {
            options: {
                separator: ';',
                process: function(src, filepath) {
                    return src.replace(/[/*<%]{4}.*[%>*/]{4}/g, '"ngform-templates",');
                }
            },

            dist: {
                src: [
                    '.tmp/templates.js',
                    'app/js/**/*.js'  
                ],
                dest: 'dist/ngform-builder.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                   'dist/ngform-builder.min.js': ['dist/ngform-builder.js']
                }
            }
        },

        less: {
            development: {
                files: {
                    "dist/css/ngform-builder.css": "app/less/ngform-builder.less"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('build', [
        'clean:all', 'html2js', 'less', 'concat', 'copy', 'uglify', 'clean:tmp'
    ]);

    grunt.registerTask('default', [
        'connect'
    ]);
};