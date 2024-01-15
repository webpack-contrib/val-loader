import path from "path";

import { getCompiler, compile, readAsset, normalizeErrors } from "./helpers";

describe("executableFile option", () => {
  it("should work with commonjs format", async () => {
    const compiler = getCompiler(
      "executableFileEntry.js",
      {},
      {
        module: {
          rules: [
            {
              test: /\.(json)$/i,
              rules: [
                {
                  loader: require.resolve("./helpers/helperLoader.js"),
                },
                {
                  loader: require.resolve("../src"),
                  options: {
                    executableFile: path.resolve(
                      __dirname,
                      "fixtures",
                      "executableFile.js",
                    ),
                  },
                },
              ],
            },
            {
              test: /\.json$/i,
              type: "asset/resource",
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result",
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings",
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  // TODO jest have not good support for ES modules for testing it, tested manually
  it.skip("should work with ES modules format", async () => {
    const compiler = getCompiler(
      "executableFileEntry.js",
      {},
      {
        module: {
          rules: [
            {
              test: /\.(json)$/i,
              rules: [
                {
                  loader: require.resolve("./helpers/helperLoader.js"),
                },
                {
                  loader: require.resolve("../src"),
                  options: {
                    executableFile: path.resolve(
                      __dirname,
                      "fixtures",
                      "executableFileES.mjs",
                    ),
                  },
                },
              ],
            },
            {
              test: /\.json$/i,
              type: "asset/resource",
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);

    expect(readAsset("val-loader.js", compiler, stats)).toMatchSnapshot(
      "result",
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings",
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });

  it("should emit error", async () => {
    const compiler = getCompiler(
      "executableFileEntry.js",
      {},
      {
        module: {
          rules: [
            {
              test: /\.(json)$/i,
              rules: [
                {
                  loader: require.resolve("./helpers/helperLoader.js"),
                },
                {
                  loader: require.resolve("../src"),
                  options: {
                    executableFile: path.resolve(
                      __dirname,
                      "fixtures",
                      "error-require.js",
                    ),
                  },
                },
              ],
            },
            {
              test: /\.json$/i,
              type: "asset/resource",
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      "warnings",
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot("errors");
  });
});
