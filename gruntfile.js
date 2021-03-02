module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowercopy:
            {
                options: {
                    clean: true
                },
                bootstrap: {
                    
                    files: {
                        'scss': '/bootstrap-sass/assets/stylesheets',
                        'Content/js/bootstrap.js': 'bootstrap-sass/assets/javascripts/bootstrap.js',
                        'Content/js/bootstrap.min.js': 'bootstrap-sass/assets/javascripts/bootstrap.min.js'
                    }
                },
                fontawesome: {
                    files: {
                        'Content/css': '/font-awesome/css',
                        'Content/fonts' : '/font-awesome/fonts'
                    }
                },
                jquery: {
                    files: {
                        'Content/js': '/jquery-legacy/dist',
                    }
                }
                
            },
        sass: {
            dist: {
                options: {
                    style: 'nested',
                    sourcemap: 'none'
                },
                files: {
                    'Content/css/thp-core.css': 'scss/thp-core.scss',
                    'Content/css/thp-print.css': 'scss/thp-print.scss',
                    'Content/css/thp-custom.css': 'scss/thp-custom.scss'

                }
            }
        },
        //We only want to run the autoprefixer on any CUSTOM css. THP-core.css and THP-print.css are compiled from Bootstrap which already has the proper prefixes.
        postcss: {
            options: {
                processors: require('autoprefixer-core')({ browsers: 'last 3 versions' }),
            },
            dist: {
                src: 'Content/css/thp-custom.css',
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'Content/css',
                    src: ['thp*.css', '!thp*.min.css'],
                    dest: 'Content/css',
                    ext: '.min.css'
                }]
            }
            
        },
        watch: {
            css: {
                files: 'scss/*.scss',
                tasks: ['sass', 'postcss', 'cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['watch']);
}