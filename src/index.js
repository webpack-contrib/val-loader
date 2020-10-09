import Module from 'module';

import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

const parentModule = module;

function exec(code, loaderContext) {
  const { resource, context } = loaderContext;

  const module = new Module(resource, parentModule);

  // eslint-disable-next-line no-underscore-dangle
  module.paths = Module._nodeModulePaths(context);
  module.filename = resource;

  // eslint-disable-next-line no-underscore-dangle
  module._compile(code, resource);

  return module.exports;
}

function processResult(loaderContext, result) {
  if (!result || typeof result !== 'object' || 'code' in result === false) {
    loaderContext.callback(
      new Error(
        `The returned result of module "${loaderContext.resource}" is not an object with a "code" property`
      )
    );

    return;
  }

  if (
    typeof result.code !== 'string' &&
    result.code instanceof Buffer === false
  ) {
    loaderContext.callback(
      new Error(
        `The returned code of module "${loaderContext.resource}" is neither a string nor an instance of Buffer`
      )
    );

    return;
  }

  (result.dependencies || []).forEach((dep) =>
    loaderContext.addDependency(dep)
  );

  (result.contextDependencies || []).forEach((dep) =>
    loaderContext.addContextDependency(dep)
  );

  // Defaults to false which is a good default here because we assume that
  // results tend to be not cacheable when this loader is necessary
  loaderContext.cacheable(Boolean(result.cacheable));

  loaderContext.callback(
    null,
    result.code,
    result.sourceMap || null,
    result.ast || null
  );
}

export default function loader(content) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Val Loader',
    baseDataPath: 'options',
  });

  let exports;

  try {
    exports = exec(content, this);
  } catch (error) {
    throw new Error(`Unable to execute "${this.resource}": ${error}`);
  }

  const func = exports && exports.default ? exports.default : exports;

  if (typeof func !== 'function') {
    throw new Error(
      `Module "${this.resource}" does not export a function as default`
    );
  }

  let result;

  try {
    result = func(options, this);
  } catch (error) {
    throw new Error(`Module "${this.resource}" throw error: ${error}`);
  }

  if (result && typeof result.then === 'function') {
    const callback = this.async();

    result
      .then((res) => processResult(this, res))
      .catch((error) => {
        callback(new Error(`Module "${this.resource}" throw error: ${error}`));
      });

    return;
  }

  // No return necessary because processResult calls this.callback()
  processResult(this, result);
}
