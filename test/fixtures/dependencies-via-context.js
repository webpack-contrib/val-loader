function dependencies(options, loaderContext) {
  loaderContext.addDependency(require.resolve('./args.js'));
  loaderContext.addDependency(require.resolve('./simple.js'));
  loaderContext.addContextDependency(__dirname);

  return {
    code: 'module.exports = "hello world";',
  };
}

module.exports = dependencies;
