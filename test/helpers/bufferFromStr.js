const isBelowNode6 = Number(process.versions.node[0]) < 6;

/**
 * This helper function creates a buffer from a string.
 * Since there was a breaking change between node 4 and 6, we have
 * to use different APIs to avoid deprecation warnings.
 *
 * This helper can be removed if node < 6 is not supported anymore.
 *
 * @param {string} str
 */
function bufferFromStr(str) {
  if (isBelowNode6) {
    return new Buffer(str, 'utf8');
  }
  return Buffer.from(str);
}

module.exports = bufferFromStr;
