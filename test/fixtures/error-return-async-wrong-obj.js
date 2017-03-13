'use strict';

function errorReturnWrongObj() {
  return Promise.resolve(null);
}

module.exports = errorReturnWrongObj;
