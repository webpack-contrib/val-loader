function dependencies() {
  return {
    dependencies: [
      require.resolve('./args.js'),
      require.resolve('./simple.js'),
    ],
    code: '',
  };
}

module.exports = dependencies;
