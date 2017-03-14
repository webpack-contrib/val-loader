function buffer() {
  return {
    code: Buffer.from('Hello from buffer fixture'),
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = buffer;
