'use strict';

const loaderUtils = require('loader-utils');

function valLoader(content) {
  const query = loaderUtils.getOptions(this) || {};
  if (query.cacheable && this.cacheable) { this.cacheable(); }
  if (this.inputValue) {
    return this.inputValue;
  }
  return this.exec(content, this.resource);
}

module.exports = valLoader;
