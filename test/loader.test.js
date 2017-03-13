'use strict';

const path = require('path');
// Not using webpack default 'should' because we are working with different execution contexts here.
// All returned objects from the loader don't have should's prototype extensions applied.
const chai = require('chai');
const compile = require('./helpers/compile');

const expect = chai.expect;

function rel(p) {
  return path.relative(process.cwd(), p);
}

describe('loader', () => {
  it('should pass on the value of the simple fixture', () =>
    compile('simple')
      .then((result) => {
        expect(result.inspect.arguments).to.eql(['Hello from simple fixture']);
      })
  );

  it('should recognize modules produced by babel', () =>
    compile('babel')
      .then((result) => {
        expect(result.inspect.arguments).to.eql(['Hello from babel fixture']);
      })
  );

  it('should call the function with the loader options', () => {
    const loaderOptions = {};

    return compile('args', loaderOptions)
      .then((result) => {
        expect(result.inspect.arguments[0]).to.equal(loaderOptions);
      });
  });

  it('should flag the module as not cacheable by default', () => {
    const loaderOptions = {};
    let cacheable;
    const loaderContext = {
      cacheable(flag) {
        cacheable = flag;
      },
    };

    return compile('simple', loaderOptions, loaderContext)
      .then(() => {
        expect(cacheable).to.equal(false);
      });
  });

  it('should flag the module as cacheable if requested', () => {
    const loaderOptions = {};
    let cacheable;
    const loaderContext = {
      cacheable(flag) {
        cacheable = flag;
      },
    };

    return compile('cacheable', loaderOptions, loaderContext)
      .then(() => {
        expect(cacheable).to.equal(true);
      });
  });

  it('should flag the module as cacheable if requested', () => {
    const dependencies = [];
    const loaderOptions = {};
    const loaderContext = {
      addDependency: dependencies.push.bind(dependencies),
    };

    return compile('dependencies', loaderOptions, loaderContext)
      .then(() => {
        expect(dependencies).to.eql([
          // Webpack adds the loaded fixture to the dependencies
          require.resolve('./fixtures/dependencies.js'),
          // These are the dependencies that should be added by our fixture
          require.resolve('./fixtures/args.js'),
          require.resolve('./fixtures/simple.js'),
        ]);
      });
  });

  it('should work the same if a promise is returned', () => {
    const loaderOptions = {};
    let cacheable;
    const loaderContext = {
      cacheable(flag) {
        cacheable = flag;
      },
    };

    return compile('promise', loaderOptions, loaderContext)
      .then((result) => {
        expect(result.inspect.arguments).to.eql(['This value is asynchronous']);
        expect(cacheable).to.equal(true);
      });
  });

  it('should report require() errors with a useful stacktrace', () =>
    compile('error-require')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        expect(err.message).to.contain('This is a typical require() error');
        expect(err.message).to.contain(require.resolve('./fixtures/error-require.js'));
      })
  );

  it('should throw a useful error message if the module exports not a function', () =>
    compile('error-export-null')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        const p = rel(require.resolve('./fixtures/error-export-null.js'));

        expect(err.message).to.contain(`Module ${p} does not export a function as default.`);
      })
  );

  it('should throw a useful error message if the exported function returns a wrong object (sync)', () =>
    compile('error-return-sync-wrong-obj')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        const p = rel(require.resolve('./fixtures/error-return-sync-wrong-obj.js'));

        expect(err.message).to.contain(`The returned result of module ${rel(p)} is not an object with a value property.`);
      })
  );

  it('should throw a useful error message if the exported function returns a wrong object (async)', () =>
    compile('error-return-async-wrong-obj')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        const p = rel(require.resolve('./fixtures/error-return-async-wrong-obj.js'));

        expect(err.message).to.contain(`The returned result of module ${rel(p)} is not an object with a value property.`);
      })
  );

  it('should throw a useful error message if the exported function returns a value that is not an array (sync)', () =>
    compile('error-return-sync-no-array-value')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        const p = rel(require.resolve('./fixtures/error-return-sync-no-array-value.js'));

        expect(err.message).to.contain(`The returned value of module ${rel(p)} is not an array.`);
      })
  );

  it('should throw a useful error message if the exported function returns a value that is not an array (async)', () =>
    compile('error-return-async-no-array-value')
      .then(() => {
        throw new Error('Should not be resolved');
      },
      (err) => {
        const p = rel(require.resolve('./fixtures/error-return-async-no-array-value.js'));

        expect(err.message).to.contain(`The returned value of module ${rel(p)} is not an array.`);
      })
  );
});
