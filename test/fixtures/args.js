function args(...args) {
  return {
    code: 'module.exports = "hello world";',
    // We can't use rest parameters here because this code is not touched by babel
    // We use the ast property because it is not validated
    ast: args, // eslint-disable-line prefer-rest-params
  };
}

module.exports = args;
