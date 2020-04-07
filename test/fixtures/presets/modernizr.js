const modernizr = require("modernizr");

function wrapOutput(output) {
  return "(function(window){\n" +
    "var hadGlobal = 'Modernizr' in window;\n" +
    "var oldGlobal = window.Modernizr;\n" +
    output + "\n" +
    "module.exports = window.Modernizr;\n" +
    "if (hadGlobal) { window.Modernizr = oldGlobal; }\n" +
    "else { delete window.Modernizr; }\n" +
    "})(window);";
}

module.exports = function (options) {
  return new Promise(function(resolve) {
    // It is impossible to throw an error because modernizr causes the process.exit(1)
    modernizr.build(options, function (output) {
      resolve({
        code: 'module.exports = ' + wrapOutput(output)
      });
    });
  });
}
