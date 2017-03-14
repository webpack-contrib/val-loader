function promise() {
  return Promise.resolve({
    cacheable: true,
    code: 'Hello from promise fixture',
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  });
}

module.exports = promise;
