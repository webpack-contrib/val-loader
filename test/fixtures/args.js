function args() {
  return {
    // We can't use rest parameters here because this code is not touched by babel
    value: Array.from(arguments), // eslint-disable-line prefer-rest-params
  };
}

module.exports = args;
