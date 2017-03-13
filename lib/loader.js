'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');

function rel(p) {
  return path.relative(process.cwd(), p);
}

function processResult(loaderContext, result) {
  if (!result || typeof result !== 'object' || 'value' in result === false) {
    throw new Error(`The returned result of module ${rel(this.resource)} is not an object with a value property.`);
  }
  if (Array.isArray(result.value) === false) {
    throw new Error(`The returned value of module ${rel(this.resource)} is not an array.`);
  }

  (result.dependencies || [])
    .forEach(dep => loaderContext.addDependency(dep));
  // defaults to false which is a good default here because we assume that
  // results tend to be not cacheable when this loader is necessary
  loaderContext.cacheable(Boolean(result.cacheable));

  loaderContext.callback.apply(loaderContext, result);
}

function valLoader(content) {
  const options = Object.assign({}, loaderUtils.getOptions(this));
  const exports = this.exec(content, this.resource);
  const func = (exports && exports.default) ? exports.default : exports;

  if (typeof func !== 'function') {
    throw new Error(`Module ${rel(this.resource)} does not export a function as default.`);
  }

  const result = func(options);

  if (typeof result.then === 'function') {
    const callback = this.async();
    result.then(res => processResult(this, res), callback);
    return;
  }

  // No return necessary because processResult calls this.callback()
  processResult(result);
}

module.exports = valLoader;
