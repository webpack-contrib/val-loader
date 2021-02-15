function dependencies() {
  return {
    dependencies: [
      require.resolve('./args.js'),
      require.resolve('./simple.js'),
    ],
    buildDependencies: [
      require.resolve('./args.js'),
      require.resolve('./simple.js'),
    ],
    contextDependencies: [__dirname],
    code: 'module.exports = "hello world";',
  };
}

module.exports = dependencies;
