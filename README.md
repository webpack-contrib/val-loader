<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# val-loader

A webpack loader which executes a given module, and returns the result of the
execution at build-time, when the module is required in the bundle. In this way,
the loader changes a module from code to a result.

Another way to view `val-loader`, is that it allows a user a way to make their
own custom loader logic, without having to write a custom loader.

The target module is called with two arguments: `(options, loaderContext)`

- `options`: The loader options (for instance provided in the webpack config. See the [example](#examples) below).
- `loaderContext`: [The loader context](https://webpack.js.org/api/loaders/#the-loader-context).

## Getting Started

To begin, you'll need to install `val-loader`:

```console
$ npm install val-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**target-file.js**

```js
module.exports = (options, loaderContext) => {
  return { code: 'module.exports = 42;' };
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /target-file.js$/,
        use: [
          {
            loader: `val-loader`,
          },
        ],
      },
    ],
  },
};
```

**src/entry.js**

```js
const answer = require('target-file');
```

And run `webpack` via your preferred method.

## Return Object Properties

Targeted modules of this loader must export a `Function` that returns an object,
or a `Promise` resolving an object (e.g. async function), containing a `code` property at a minimum, but can
contain any number of additional properties.

### `code`

Type: `String|Buffer`
Default: `undefined`
_Required_

Code passed along to webpack or the next loader that will replace the module.

### `sourceMap`

Type: `Object`
Default: `undefined`

A source map passed along to webpack or the next loader.

### `ast`

Type: `Array[Object]`
Default: `undefined`

An [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
that will be passed to the next loader. Useful to speed up the build time if the
next loader uses the same AST.

### `dependencies`

Type: `Array[String]`
Default: `[]`

An array of absolute, native paths to file dependencies that should be watched
by webpack for changes.

Dependencies can also be added using [`loaderContext.addDependency(file: string)`](https://webpack.js.org/api/loaders/#thisadddependency).

### `contextDependencies`

Type: `Array[String]`
Default: `[]`

An array of absolute, native paths to directory dependencies that should be
watched by webpack for changes.

Context dependencies can also be added using [`loaderContext.addContextDependency(directory: string)`](https://webpack.js.org/api/loaders/#thisaddcontextdependency).

### `cacheable`

Type: `Boolean`
Default: `false`

If `true`, specifies that the code can be re-used in watch mode if none of the
`dependencies` have changed.

## Examples

### Simple

In this example the loader is configured to operator on a file name of
`years-in-ms.js`, execute the code, and store the result in the bundle as the
result of the execution. This example passes `years` as an `option`, which
corresponds to the `years` parameter in the target module exported function:

**years-in-ms.js**

```js
module.exports = function yearsInMs({ years }) {
  const value = years * 365 * 24 * 60 * 60 * 1000;
  // NOTE: this return value will replace the module in the bundle
  return { code: 'module.exports = ' + value };
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('src/years-in-ms.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              years: 10,
            },
          },
        ],
      },
    ],
  },
};
```

In the bundle, requiring the module then returns:

```js
// ... bundle code ...

const tenYearsMs = require('years-in-ms'); // 315360000000
```

```js
// ... bundle code ...

require('val-loader!tenyearsinms') == 315360000000;
```

### Figlet

Example shows how to build [`figlet`](https://www.npmjs.com/package/figlet)

**figlet.js**

```js
const figlet = require('figlet');

function wrapOutput(output, config) {
  let figletOutput = '';

  if (config.textBefore) {
    figletOutput += encodeURI(`${config.textBefore}\n`);
  }

  output.split('\n').forEach((line) => {
    figletOutput += encodeURI(`${line}\n`);
  });

  if (config.textAfter) {
    figletOutput += encodeURI(`${config.textAfter}\n`);
  }

  return `module.exports = decodeURI("${figletOutput}");`;
}

module.exports = function(options) {
  const defaultConfig = {
    fontOptions: {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      kerning: 'default',
      verticalLayout: 'default',
    },
    text: 'FIGLET-LOADER',
    textAfter: null,
    textBefore: null,
  };

  const config = Object.assign({}, defaultConfig, options);

  return new Promise(function(resolve, reject) {
    figlet.text(config.text, config.fontOptions, (error, output) => {
      if (error) {
        return reject(error);
      }

      resolve({
        code: 'module.exports = ' + wrapOutput(output, config),
      });
    });
  });
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('src/figlet.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              text: 'FIGLET',
            },
          },
        ],
      },
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/val-loader.svg
[npm-url]: https://npmjs.com/package/val-loader
[node]: https://img.shields.io/node/v/val-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/val-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/val-loader
[tests]: https://dev.azure.com/webpack-contrib/val-loader/_apis/build/status/webpack-contrib.val-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/val-loader/_build/latest?definitionId=2&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/val-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/val-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=val-loader
[size-url]: https://packagephobia.now.sh/result?p=val-loader
