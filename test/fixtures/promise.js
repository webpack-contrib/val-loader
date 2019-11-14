function promise() {
  return Promise.resolve({
    cacheable: true,
    code: 'module.exports = "hello world";',
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  });
}

module.exports = promise;
