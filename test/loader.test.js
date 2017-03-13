

const path = require('path');
const compile = require('./helpers/compile');

function rel(p) {
  return path.relative(process.cwd(), p);
}

test('should pass on the value of the simple fixture', () =>
  compile('simple')
    .then((result) => {
      expect(result.inspect.arguments).toEqual(['Hello from simple fixture']);
    }),
);

test('should recognize modules produced by babel', () =>
  compile('babel')
    .then((result) => {
      expect(result.inspect.arguments).toEqual(['Hello from babel fixture']);
    }),
);

test('should call the function with the loader options', () => {
  const loaderOptions = {};

  return compile('args', loaderOptions)
    .then((result) => {
      expect(result.inspect.arguments[0]).toBe(loaderOptions);
    });
});

test('should flag the module as not cacheable by default', () => {
  const loaderOptions = {};
  let cacheable;
  const loaderContext = {
    cacheable(flag) {
      cacheable = flag;
    },
  };

  return compile('simple', loaderOptions, loaderContext)
    .then(() => {
      expect(cacheable).toBe(false);
    });
});

test('should flag the module as cacheable if requested', () => {
  const loaderOptions = {};
  let cacheable;
  const loaderContext = {
    cacheable(flag) {
      cacheable = flag;
    },
  };

  return compile('cacheable', loaderOptions, loaderContext)
    .then(() => {
      expect(cacheable).toBe(true);
    });
});

test('should flag the module as cacheable if requested', () => {
  const dependencies = [];
  const loaderOptions = {};
  const loaderContext = {
    addDependency: dependencies.push.bind(dependencies),
  };

  return compile('dependencies', loaderOptions, loaderContext)
    .then(() => {
      expect(dependencies).toEqual([
        // Webpack adds the loaded fixture to the dependencies
        require.resolve('./fixtures/dependencies.js'),
        // These are the dependencies that should be added by our fixture
        require.resolve('./fixtures/args.js'),
        require.resolve('./fixtures/simple.js'),
      ]);
    });
});

test('should work the same if a promise is returned', () => {
  const loaderOptions = {};
  let cacheable;
  const loaderContext = {
    cacheable(flag) {
      cacheable = flag;
    },
  };

  return compile('promise', loaderOptions, loaderContext)
    .then((result) => {
      expect(result.inspect.arguments).toEqual(['This value is asynchronous']);
      expect(cacheable).toBe(true);
    });
});

test('should report require() errors with a useful stacktrace', () =>
  compile('error-require')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      expect(err.message).toContain('This is a typical require() error');
      expect(err.message).toContain(require.resolve('./fixtures/error-require.js'));
    }),
);

test('should throw a useful error message if the module exports not a function', () =>
  compile('error-export-null')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      const p = rel(require.resolve('./fixtures/error-export-null.js'));

      expect(err.message).toContain(`Module ${p} does not export a function as default.`);
    }),
);

test('should throw a useful error message if the exported function returns a wrong object (sync)', () =>
  compile('error-return-sync-wrong-obj')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      const p = rel(require.resolve('./fixtures/error-return-sync-wrong-obj.js'));

      expect(err.message).toContain(`The returned result of module ${rel(p)} is not an object with a value property.`);
    }),
);

test('should throw a useful error message if the exported function returns a wrong object (async)', () =>
  compile('error-return-async-wrong-obj')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      const p = rel(require.resolve('./fixtures/error-return-async-wrong-obj.js'));

      expect(err.message).toContain(`The returned result of module ${rel(p)} is not an object with a value property.`);
    }),
);

test('should throw a useful error message if the exported function returns a value that is not an array (sync)', () =>
  compile('error-return-sync-no-array-value')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      const p = rel(require.resolve('./fixtures/error-return-sync-no-array-value.js'));

      expect(err.message).toContain(`The returned value of module ${rel(p)} is not an array.`);
    }),
);

test('should throw a useful error message if the exported function returns a value that is not an array (async)', () =>
  compile('error-return-async-no-array-value')
    .then(() => {
      throw new Error('Should not be resolved');
    },
    (err) => {
      const p = rel(require.resolve('./fixtures/error-return-async-no-array-value.js'));

      expect(err.message).toContain(`The returned value of module ${rel(p)} is not an array.`);
    }),
);
