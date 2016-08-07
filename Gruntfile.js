module.exports = function (grunt) {

    var script = grunt.file.read("dist/script.js");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            dist: {
                files: {
                    'dist/style.min.css': ['dist/tidy.css']
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: 'myscript',
                        replacement: script
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['index.html'],
                    dest: 'dist/'
                }]
            }
        },
        processhtml: {
            dist: {
                options: {
                    process: true,
                    data: {
                        title: 'My app',
                        message: 'This is production distribution'
                    }
                },
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        uncss: {
            dist: {
                files: {
                    'dist/tidy.css': ['index.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.registerTask('default', ['replace', 'uncss', 'cssmin', 'processhtml', 'htmlmin']);

};