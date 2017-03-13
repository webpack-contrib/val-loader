function errorReturnNoArrayValue() {
  return Promise.resolve({
    value: null,
  });
}

module.exports = errorReturnNoArrayValue;
