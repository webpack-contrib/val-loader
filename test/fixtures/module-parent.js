function simple() {
  return {
    code: 'module.exports = "hello world";',
    sourceMap: { isASourceMap: true },
    ast: {
      isAnAst: true,
      hasParent: Boolean(module.parent)
    },
  };
}

module.exports = simple;
