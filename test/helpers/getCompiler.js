const path = require("path");

const webpack = require("webpack");
const { createFsFromVolume, Volume } = require("memfs");

module.exports = (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(__dirname, "../fixtures"),
    entry: path.resolve(__dirname, "../fixtures", fixture),
    output: {
      path: path.resolve(__dirname, "../outputs/"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          rules: [
            {
              loader: require.resolve("./helperLoader.js"),
            },
            {
              loader: require.resolve("../../src"),
              options: loaderOptions,
            },
          ],
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
};
