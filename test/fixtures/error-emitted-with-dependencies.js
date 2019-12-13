function errorEmittedWithDependencies(options, loaderOptions) {
  loaderOptions.emitError(new Error('Calling the function failed'));

  return {
    dependencies: [
      require.resolve('./args.js'),
      require.resolve('./simple.js'),
    ],
    contextDependencies: [__dirname],
    code: 'module.exports = "hello world";',
  };
}

module.exports = errorEmittedWithDependencies;
