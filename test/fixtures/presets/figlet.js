const figlet = require("figlet");

function wrapOutput(output, config) {
  let figletOutput = "";

  if (config.textBefore) {
    figletOutput += encodeURI(`${config.textBefore}\n`);
  }

  output.split("\n").forEach(line => {
    figletOutput += encodeURI(`${line}\n`);
  });

  if (config.textAfter) {
    figletOutput += encodeURI(`${config.textAfter}\n`);
  }

  return `module.exports = decodeURI("${figletOutput}");`;
}

module.exports = function (options) {
  const defaultConfig = {
    fontOptions: {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      kerning: "default",
      verticalLayout: "default"
    },
    text: "FIGLET-LOADER",
    textAfter: null,
    textBefore: null
  };

  const config = Object.assign({}, defaultConfig, options);

  return new Promise(function(resolve, reject) {
    figlet.text(config.text, config.fontOptions, (error, output) => {
      if (error) {
        return reject(error)
      }

      resolve({
        code: 'module.exports = ' + wrapOutput(output, config)
      });
    });
  });
}
