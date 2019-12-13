function args(options) {
  return {
    code: 'module.exports = "hello world";',
    // We use the ast property because it is not validated
    ast: [options],
  };
}

module.exports = args;
