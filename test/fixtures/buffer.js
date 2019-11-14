function buffer() {
  return {
    code: Buffer.from('module.exports = "hello world";'),
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = buffer;
