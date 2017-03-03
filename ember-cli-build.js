var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var isProduction = 'production' === process.env.EMBER_ENV;
var options = {
  cssnext: {
    features: {
      browsers: '> 1%, last 3 versions, Firefox ESR, Opera 12.1, not ie <= 8',
      customProperties: {preserve: 'computed'},
      nesting: false
    }
  },
  rucksack: {
    alias: false,
    hexRGBA: false,
    fallbacks: true
  },
  cssnano: {
    autoprefixer: false,
    core: isProduction,
    discardComments: isProduction,
    mergeIdents: false,
    reduceIdents: false,
    sourcemap: !isProduction
  }
};

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    cssModules: {
      plugins: {
        before: [
          require('postcss-import')({path: './node_modules/@choiceform/ember-choice-ui/addon/styles'}),
          require('postcss-nesting'),
          require('postcss-extend'),
        ],
        after: [
          require('postcss-fallback'),
          require('postcss-cssnext')(options.cssnext),
          require('rucksack-css')(options.rucksack),
          require('cssnano')(options.cssnano)
        ]
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
