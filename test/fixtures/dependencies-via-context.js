function dependencies(options, loaderContext) {
  loaderContext.addDependency(require.resolve('./args.js'));
  loaderContext.addDependency(require.resolve('./simple.js'));
  loaderContext.addBuildDependency(require.resolve('./args.js'));
  loaderContext.addBuildDependency(require.resolve('./simple.js'));
  loaderContext.addBuildDependency(__dirname);
  loaderContext.addContextDependency(__dirname);

  return {
    code: 'module.exports = "hello world";',
  };
}

module.exports = dependencies;
