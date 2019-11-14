function promise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 'module.exports = "hello world";',
        sourceMap: { isASourceMap: true },
        ast: { isAnAst: true },
      })
    }, 100)
  });
}

module.exports = promise;
