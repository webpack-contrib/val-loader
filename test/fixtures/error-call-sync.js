function errorCallSync() {
  throw new Error('Calling the function failed');
}

module.exports = errorCallSync;
