function codeES() {
  return {
    code: 'module.exports = "hello world";',
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = codeES;
