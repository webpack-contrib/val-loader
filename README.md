[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![travis][travis]][travis-url]
[![appveyor][appveyor]][appveyor-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Val Loader</h1>
  <p>Executes the given module to generate source code on build time<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D val-loader
```

<h2 align="center">Usage</h2>

The module that is loaded with this loader must stick to the following interfaces.

### `Module Interface`

The loaded module must export a function as `default` export with the following *Function Interface*.

```js
module.exports = function () {...};
```

Modules transpiled by [Babel](https://babeljs.io/) are also supported.

```js
export default function () {...};
```

### `Function Interface`

The function will be called with the loader [`options`](https://webpack.js.org/configuration/module/#useentry) and must either return:

**`{Object}`**

Following *Object Interface*

**`{Promise}`**

That resolves to following the *Object Interface*

### `Object Interface`

|Name|Type|Default|Description|
|:---|:--:|:-----:|:----------|
|**`code`**|`{String\|Buffer}`|`undefined`|**Required**. The code that is passed to the next loader or to webpack|
|**`sourceMap`**| [`{Object}`](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)|`undefined`|**Optional**. Will be passed to the next loader or to webpack|
|**`ast`**|`{Array<{Object}>}`|**Optional**. An [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that will be passed to the next loader. Useful to speed up the build time if the next loader uses the same AST|
|**`dependencies`**|`{Array<{String}>}`|`[]`|An array of absolute, native paths to file dependencies that need to be watched for changes.
|**`cacheable`**|`{Boolean}`|`false`|Flag whether the code can be re-used in watch mode if none of the `dependencies` have changed|

<h2 align="center">Options</h2>

The **val-loader** itself has no options. The options are passed as they are (without cloning them) to the exported function.

<h2 align="center">Examples</h2>

If you have a module like this:

**`answer.js`**
```js
function answer () {
  return {
    code: 'module.exports = 42;'
  }
};

module.exports = answer;
```

you can use the **val-loader** to generate source code on build time:

**`webpack.config.js`**
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: require.resolve('path/to/answer.js'),
        use: [
          {
            loader: 'val-loader'
          }
        ]
      }
    ]
  }
};
```

### `Complete`

A complete example of all available features looks like this:

**`answer.js`**
```js
const ask = require('./ask.js');
const generate = require('./generate.js');

function answer(options) {
  return ask(options.question)
    .then(generate)
    .then(result => ({
      ast: result.abstractSyntaxTree,
      code: result.code,
      // Mark dependencies of answer().
      // The function will be re-executed if one of these
      // dependencies has changed in watch mode.
      dependencies: [
        // Array of absolute native paths!
        require.resolve('./ask.js'),
        require.resolve('./generate.js')
      ],
      // Flag the generated code as cacheable.
      // If none of the dependencies have changed,
      // the function won't be executed again.
      cacheable: true
      sourceMap: result.sourceMap,
    })
  );
}

module.exports = answer;
```

**`webpack.config.js`**
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: require.resolve('path/to/answer.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              question: 'What is the meaning of life?'
            }
          }
        ]
      }
    ]
  }
};
```
`contextDependencies` | `Array<string>` | **Default: `[]`**. An array of absolute, native paths to directory dependencies that need to be watched for changes.
`cacheable` | `boolean` | **Default: `false`**. Flag whether the code can be re-used in watch mode if none of the `dependencies` have changed.

### Loader Options

The **val-loader** itself has no options. The options are passed as they are (without cloning them) to the exported function.

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/781746?v=3&s=150">
        </br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/val-loader.svg
[npm-url]: https://npmjs.com/package/val-loader

[node]: https://img.shields.io/node/v/val-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/val-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/val-loader

[travis]: http://img.shields.io/travis/webpack-contrib/val-loader.svg
[travis-url]: https://travis-ci.org/webpack-contrib/val-loader

[appveyor]: https://ci.appveyor.com/api/projects/status/github/webpack-contrib/val-loader?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jhnns/val-loader/branch/master

[cover]: https://codecov.io/gh/webpack-contrib/val-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/val-loader

[chat]: https://badges.gitter.im/webpack-contrib/webpack.svg
[chat-url]: https://gitter.im/webpack-contrib/webpack
