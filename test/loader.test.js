import { getCompiler, compile, readAsset, normalizeErrors } from "./helpers";

describe("loader", () => {
  it("should pass on the code from the simple fixture", async () => {
    const compiler = getCompiler("simple.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should pass on the code from the simple fixture without options", async () => {
    // eslint-disable-next-line no-undefined
    const compiler = getCompiler("simple.js", undefined);
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should pass on the code from the buffer fixture", async () => {
    const compiler = getCompiler("buffer.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should recognize modules produced by babel", async () => {
    const compiler = getCompiler("babel.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should call the function with the loader options", async () => {
    const compiler = getCompiler("args.js", {
      arg: 123,
      arg2: "string",
      arg3: true,
      arg4: null,
      // eslint-disable-next-line no-undefined
      arg5: undefined,
      arg6: {},
      arg7: Symbol("id"),
    });
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should flag the module as not cacheable by default", async () => {
    const compiler = getCompiler("simple.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    // In webpack@5 modules is Set
    expect([...stats.compilation.modules][0].buildInfo.cacheable).toBe(false);
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should flag the module as cacheable if requested", async () => {
    const compiler = getCompiler("cacheable.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    // In webpack@5 modules is Set
    expect([...stats.compilation.modules][0].buildInfo.cacheable).toBe(true);
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should handle dependencies, contextDependencies and buildDependencies of the module", async () => {
    const compiler = getCompiler("dependencies.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should allow adding dependencies, contextDependencies and buildDependencies via loader context", async () => {
    const compiler = getCompiler("dependencies-via-context.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should work the same if a promise is returned", async () => {
    const compiler = getCompiler("promise.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should work the same if a promise is returned #2", async () => {
    const compiler = getCompiler("promise-compex.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should work with async function", async () => {
    const compiler = getCompiler("async-function.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should has module.parent", async () => {
    const compiler = getCompiler("module-parent.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should keep dependencies if errors are emitted", async () => {
    const compiler = getCompiler("error-emitted-with-dependencies.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should report require() errors with a useful stacktrace", async () => {
    const compiler = getCompiler("error-require.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should throw a useful error message if the module exports not a function", async () => {
    const compiler = getCompiler("error-export-null.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should throw a useful error message if the exported function returns a wrong object (sync)", async () => {
    const compiler = getCompiler("error-return-sync-wrong-obj.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should throw a useful error message if the exported function returns a wrong object (async)", async () => {
    const compiler = getCompiler("error-return-async-wrong-obj.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should throw a useful error message if the exported function returns code that is neither a string nor an instanceof Buffer (sync)", async () => {
    const compiler = getCompiler("error-return-sync-invalid-code.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should throw a useful error message if the exported function returns code that is neither a string nor an instanceof Buffer (async)", async () => {
    const compiler = getCompiler("error-return-async-invalid-code.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should not swallow function call errors (sync)", async () => {
    const compiler = getCompiler("error-call-sync.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should not swallow function call errors (async)", async () => {
    const compiler = getCompiler("error-call-async.js");
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should pass on the code from the presets/modernizr fixture", async () => {
    const compiler = getCompiler("presets/modernizr.js", {
      minify: false,
      options: ["setClasses"],
      "feature-detects": [
        "test/css/flexbox",
        "test/es6/promises",
        "test/serviceworker",
      ],
    });
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should pass on the code from the presets/figlet fixture", async () => {
    const compiler = getCompiler("presets/figlet.js", {
      text: "FIGLET",
    });
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should work with commonjs code", async () => {
    const compiler = getCompiler("code-es.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should work with ES modules code", async () => {
    const compiler = getCompiler("code-commonjs.js");
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result"
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings"
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });
});
