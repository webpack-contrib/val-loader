import path from 'path';
import loaderUtils from 'loader-utils';

function rel(p) {
  return path.relative(process.cwd(), p);
}

function processResult(loaderContext, result) {
  if (!result || typeof result !== 'object' || 'code' in result === false) {
    loaderContext.callback(new Error(`The returned result of module ${rel(loaderContext.resource)} is not an object with a 'code' property.`));

    return;
  }

  if (typeof result.code !== 'string' && result.code instanceof Buffer === false) {
    loaderContext.callback(new Error(`The returned code of module ${rel(loaderContext.resource)} is neither a string nor an instance of Buffer.`));

    return;
  }

  (result.dependencies || [])
    .forEach(dep => loaderContext.addDependency(dep));

  (result.contextDependencies || [])
    .forEach(dep => loaderContext.addContextDependency(dep));

  // Defaults to false which is a good default here because we assume that
  // results tend to be not cacheable when this loader is necessary
  loaderContext.cacheable(Boolean(result.cacheable));

  loaderContext.callback(null, result.code, result.sourceMap || null, result.ast || null);
}

function valLoader(content) {
  const options = loaderUtils.getOptions(this);
  const exports = this.exec(content, this.resource);
  const func = (exports && exports.default) ? exports.default : exports;

  if (typeof func !== 'function') {
    throw new Error(`Module ${rel(this.resource)} does not export a function as default.`);
  }

  const result = func(options);

  if (result && typeof result.then === 'function') {
    const callback = this.async();

    result.then(res => processResult(this, res), callback);

    return;
  }

  // No return necessary because processResult calls this.callback()
  processResult(this, result);
}

export default valLoader;
