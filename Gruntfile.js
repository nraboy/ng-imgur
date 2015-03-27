module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '// <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' + '// http://www.nraboy.com\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                expr: true
            },
            all: ['ng-imgur.js']
        },
        clean: {
            js: ['*.min.js']
        },
        karma: {
            dev: {
                configFile: 'karma.unit.conf.js'
            },
            ci: {
                configFile: 'karma.unit.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['clean', 'jshint', 'uglify', 'karma:ci']);
    grunt.registerTask('default', ['clean', 'jshint', 'uglify']);

};
