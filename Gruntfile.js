/*global module:false*/

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect['static'](require('path').resolve(dir));
};
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    browserify: {
      dist: {
        src: ['src/js/*.js', 'src/js/**/*.js'],
        dest: 'dist/js/L.App.js'
      }
    },
    concat: {
      dist: {
        src: ['src/js/*.js', 'src/js/**/*.js'],
        dest: 'dist/js/L.App.js'
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dev: {
        options: {
          base: 'dist'
        }
      },
      prod: {
        options: {
          base: 'dist'
        }
      }
    },
    copy: {
      images: {
        cwd: 'node_modules',
        dest: 'dist/img/',
        src: ['leaflet/dist/images/*','esri-leaflet-geocoder/dist/img/*'],
        flatten: true,
        expand: true
      },
      css: {
        files: [{
          cwd: 'node_modules',
          expand: true,
          src: ['leaflet/dist/leaflet.css'],
          dest: 'node_modules/leaflet/dist/leaflet.scss'
        }]
      }
    },
    focus: {
      dev: {
        include: ['htmldev', 'stylesheets', 'jsdev', 'tests']
      },
      prod: {
        include: ['htmlprod', 'stylesheets', 'jsprod', 'tests']
      }
    },
    'gh-pages': {
      options: { base: 'src' },
      src: ['**']
    },
    jshint: {
      options: { jshintrc: true },
      all: ['src/js/**/*.js']
    },
    karma: {
      'unit': {
        'options': {
          'autoWatch': false,
          'configFile': './karma.conf.js',
          'singleRun': true
        }
      }
    },
    //Open default browser at the app
    open: {
      dev: { path: 'http://localhost:<%= connect.options.port %>/' },
      prod: { path: 'http://localhost:<%= connect.options.port %>/' }
    },
    processhtml: {
      prod: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      },
      dev: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },
    sass: {
      options: {
        style: 'compressed',
        includePaths: ['node_modules']
      },
      dist: {
        files: {
          'dist/css/app.css': 'src/sass/site.scss'
        }
      }
    },
    uglify: {
      app: {
        options: {
          compress: true,
          mangle: true,
          sourceMap: true
        },
        files: {
          'dist/js/L.App.min.js': ['dist/js/L.App.js']
        }
      }
    },
    //setup watch tasks
    watch: {
      options: {
        nospan: true,
        livereload: LIVERELOAD_PORT
      },
      htmldev: {
        files: ['src/index.html'],
        tasks: ['processhtml:dev']
      },
      htmlprod: {
        files: ['src/index.html'],
        tasks: ['processhtml:prod']
      },
      stylesheets: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      },
      jsdev: {
        files: ['src/js/*.js', 'src/js/**/*.js'],
        tasks: ['js:dev']
      },
      jsprod: {
        files: ['src/js/*.js', 'src/js/**/*.js'],
        tasks: ['js:prod']
      },
      tests: {
        files: ['spec/**/*.js'],
        tasks: ['karma']
      },
      livereload: {
        options: { livereload: LIVERELOAD_PORT }
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-focus');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-sass');

  // Tasks
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('test', ['karma']);

  //JS
  grunt.registerTask('js:dev', ['jshint', 'browserify', 'uglify', 'test']);
  grunt.registerTask('js:prod', ['test', 'browserify', 'uglify']);

  // CSS
  grunt.registerTask('css:dev', ['copy:css', 'sass']);
  grunt.registerTask('css:prod', ['copy:css', 'sass']);

  // Build wrappers
  grunt.registerTask('build:dev', ['js:dev', 'copy:images', 'css:dev', 'processhtml:dev']);
  grunt.registerTask('build:prod', ['js:prod', 'copy:images', 'css:prod', 'processhtml:prod']);
  // Serve locally on :8000
  grunt.registerTask('serve:dev', ['connect:dev', 'open:dev', 'focus:dev']);
  grunt.registerTask('serve:prod', ['connect:prod', 'open:prod', 'focus:prod']);
  // Overall build targets... dev and prod.  Default to dev
  grunt.registerTask('dev', ['build:dev', 'serve:dev']);
  grunt.registerTask('prod', ['build:prod', 'serve:prod']);
  grunt.registerTask('deploy', ['build:prod', 'gh-pages']);
  grunt.registerTask('default', ['dev']);
};
