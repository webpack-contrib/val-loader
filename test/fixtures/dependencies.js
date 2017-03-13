function dependencies() {
  return {
    dependencies: [
      require.resolve('./args.js'),
      require.resolve('./simple.js'),
    ],
    value: [],
  };
}

module.exports = dependencies;
