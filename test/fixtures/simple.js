function simple() {
  return {
    code: 'Hello from simple fixture',
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = simple;
