'use strict';

function promise() {
  return Promise.resolve({
    cacheable: true,
    value: ['This value is asynchronous'],
  });
}

module.exports = promise;
