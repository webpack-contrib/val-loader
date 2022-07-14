const path = require("path");

function rel(p) {
  return path.relative(process.cwd(), p);
}

module.exports = function helperLoader(content, map, meta) {
  const dependencies = this.getDependencies().map((dependency) =>
    rel(dependency).replace(/\\/g, "/")
  );
  const contextDependencies = this.getContextDependencies().map((dependency) =>
    rel(dependency).replace(/\\/g, "/")
  );

  const buildDependencies = Array.from(
    this._module.buildInfo.buildDependencies || []
  ).map((dependency) => rel(dependency).replace(/\\/g, "/"));
  const json = JSON.stringify(
    {
      content,
      map,
      meta,
      dependencies,
      contextDependencies,
      buildDependencies,
    },
    null,
    "  "
  )
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  this.emitFile("val-loader.js", json, false);

  return ``;
};
