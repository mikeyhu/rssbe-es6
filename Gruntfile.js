module.exports = function (grunt) {
  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            HTTP_LOGGING:'dev'
          },
          nodeArgs: ['--harmony'],
          ext: 'js',
          ignore: ['node_modules/**', 'app/assets/**'],
          args: grunt.option.flags()
        }
      }
    },

    watch: {
      test: {
        files: ['**/*.js'],
        tasks: ['mochaTest']
      }
    },

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });
  [
    'grunt-contrib-watch',
    'grunt-nodemon',
    'grunt-concurrent',
    'grunt-mocha-test'
  ].forEach(function (task) {
      grunt.loadNpmTasks(task);
    });

  grunt.registerTask('default', ['build', 'concurrent:target']);

  grunt.registerTask('build', ['mochaTest']);

  grunt.registerTask('test', ['build']);
};
