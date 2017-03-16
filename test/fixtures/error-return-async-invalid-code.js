function errorReturnInvalidCode() {
  return Promise.resolve({
    code: null,
  });
}

module.exports = errorReturnInvalidCode;
