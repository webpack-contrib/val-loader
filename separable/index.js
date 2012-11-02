/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var mainLoader = require("../index");
module.exports = function() {
	return mainLoader.apply(this, arguments);
}
module.exports.separable = true;