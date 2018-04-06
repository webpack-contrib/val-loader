const path = require('path');

const webpack = require('webpack');

const valLoader = require.resolve('../../src');
const helperLoader = require.resolve('./helperLoader.js');
const fixturePath = path.resolve(__dirname, '..', 'fixtures');
const outputPath = path.resolve(__dirname, '..', 'output');

const rawFixtures = ['buffer'];

function compile(fixture, loaderOptions, loaderContext) {
  return new Promise((resolve, reject) => {
    const entry = path.resolve(fixturePath, `${fixture}.js`);
    const raw = rawFixtures.indexOf(fixture) !== -1;
    let inspect;

    webpack(
      {
        entry,
        output: {
          path: outputPath,
          // omitting the js extension to prevent jest's watcher from triggering
          filename: 'bundle',
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              loaders: [
                {
                  loader: helperLoader,
                  options: loaderContext,
                },
                {
                  loader: `inspect-loader${raw ? '/raw' : ''}`,
                  options: {
                    callback(i) {
                      inspect = i;
                    },
                  },
                },
                {
                  loader: valLoader,
                  options: loaderOptions,
                },
              ],
            },
          ],
        },
      },
      (err, stats) => {
        const problem =
          err || stats.compilation.errors[0] || stats.compilation.warnings[0];

        if (problem) {
          const message =
            typeof problem === 'string' ? problem : 'Unexpected error';
          const error = new Error(problem.message || message);

          error.originalError = problem;
          error.stats = stats;

          reject(error);

          return;
        }

        resolve({
          inspect,
          stats,
        });
      }
    );
  });
}

module.exports = compile;
