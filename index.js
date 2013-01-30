/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
module.exports = function(content) {
	var query = loaderUtils.parseQuery(this.query);
	if(query.cacheable && this.cacheable)
		this.cacheable();
	if(this.inputValue) {
		return null, this.inputValue;
	} else {
		return this.exec(content, this.resource);
	}
}