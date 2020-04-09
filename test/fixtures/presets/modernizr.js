const modernizr = require("modernizr");

module.exports = function(options) {
  return new Promise(function(resolve) {
    // It is impossible to throw an error because modernizr causes the process.exit(1)
    modernizr.build(options, function(output) {
      resolve({
        cacheable: true,
        code: `var modernizr; var hadGlobal = 'Modernizr' in window; var oldGlobal = window.Modernizr; ${output} modernizr = window.Modernizr; if (hadGlobal) { window.Modernizr = oldGlobal; } else { delete window.Modernizr; } export default modernizr;`
      });
    });
  });
};
