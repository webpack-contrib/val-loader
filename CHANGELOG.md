# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
