# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.2](https://github.com/webpack-contrib/val-loader/compare/v2.1.1...v2.1.2) (2020-10-09)

### Chore

* update `schema-utils`

### [2.1.1](https://github.com/webpack-contrib/val-loader/compare/v2.1.0...v2.1.1) (2020-04-09)

### Chore

* update deps

## [2.1.0](https://github.com/webpack-contrib/val-loader/compare/v2.0.2...v2.1.0) (2019-12-17)


### Features

* pass `loaderContext` as 2nd parameter ([#47](https://github.com/webpack-contrib/val-loader/issues/47)) ([cd5dd47](https://github.com/webpack-contrib/val-loader/commit/cd5dd471f41dc5dbb541e09ea8af0f3ed0ad23de))

### [2.0.2](https://github.com/webpack-contrib/val-loader/compare/v2.0.1...v2.0.2) (2019-11-25)


### Chore

* add the `funding` field in `package.json`



### [2.0.1](https://github.com/webpack-contrib/val-loader/compare/v2.0.0...v2.0.1) (2019-11-19)


### Bug Fixes

* link on package ([#44](https://github.com/webpack-contrib/val-loader/issues/44)) ([f234364](https://github.com/webpack-contrib/val-loader/commit/f234364a0c98f05fd0c4203c0a3946d6f0075adc))

### [2.0.0](https://github.com/webpack-contrib/val-loader/compare/v1.1.1...v2.0.0) (2019-11-14)


### Bug Fixes

* support `webpack@5`


### Features

* better handle errors from a module
* pass `module.parent` to a module
* validate loader options


### BREAKING CHANGES

* minimum supported node version is `10.13.0`
* minimum supported webpack version is `4.0.0`



<a name="1.1.1"></a>
## [1.1.1](https://github.com/webpack-contrib/val-loader/compare/v1.1.0...v1.1.1) (2018-06-21)


### Bug Fixes

* add support for `webpack@4` ([#30](https://github.com/webpack-contrib/val-loader/issues/30)) ([fea518d](https://github.com/webpack-contrib/val-loader/commit/fea518d))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/webpack-contrib/val-loader/compare/v1.0.2...v1.1.0) (2017-11-19)


### Features

* add support for `contextDependencies` in the `{Object}` interface (`options.contextDependencies`) ([#23](https://github.com/webpack-contrib/val-loader/issues/23)) ([78aa6fe](https://github.com/webpack-contrib/val-loader/commit/78aa6fe))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/webpack-contrib/val-loader/compare/v1.0.1...v1.0.2) (2017-03-21)


### Bug Fixes

* **.babelrc:** enable modules ([b0b116a](https://github.com/webpack-contrib/val-loader/commit/b0b116a))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/webpack-contrib/val-loader/compare/v1.0.0...v1.0.1) (2017-03-20)


### Bug Fixes

* **src:** add CJS wrapper ([cd043f5](https://github.com/webpack-contrib/val-loader/commit/cd043f5))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/webpack-contrib/val-loader/compare/v0.5.1...v1.0.0) (2017-03-16)


### Features

* change expected module API ([caf2aab](https://github.com/webpack-contrib/val-loader/commit/caf2aab))


### BREAKING CHANGES

* this commit introduces a major refactoring of the loader.
* remove node 0.10 and node 0.12 support
* the loaded module must now export a function
* this function will be called with the loader options
* this function must return an object with this structure

Property | Type | Description
:--------|:-----|:-----------
`code`   | `string|Buffer` | **Required**. The code that is passed to the next loader or to webpack.
`sourceMap` | [`SourceMap`](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit) | **Optional**. Will be pased to the next loader or to webpack.
`ast` | `any` | **Optional**. An [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that will be passed to the next loader. Useful to speed up the build time if the next loader uses the same AST.
`dependencies` | `Array<string>` | **Default: `[]`**. An array of absolute, native paths to file dependencies that need to be watched for changes.
`cacheable` | `boolean` | **Default: `false`**. Flag whether the code can be re-used in watch mode if none of the `dependencies` have changed.

* the function may also return a promise for async results
* switch tooling to webpack-defaults
