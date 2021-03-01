function codeES() {
  return {
    code: 'export default "hello world";',
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = codeES;
