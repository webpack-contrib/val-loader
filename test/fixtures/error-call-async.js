function errorCallAsync() {
  return Promise.reject(new Error('Calling the function failed asynchronously'));
}

module.exports = errorCallAsync;
