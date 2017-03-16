const bufferFromStr = require('../helpers/bufferFromStr');

function buffer() {
  return {
    code: bufferFromStr('Hello from buffer fixture'),
    sourceMap: { isASourceMap: true },
    ast: { isAnAst: true },
  };
}

module.exports = buffer;
