/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
module.exports = function() {
	var query = loaderUtils.parseQuery(this.query);
	if(query.cacheable && this.cacheable)
		this.cacheable();
	if(this.inputValues) {
		var arr = Array.prototype.slice.call(this.inputValues, 0);
		arr.unshift(null);
		this.callback.apply(null, arr);
	} else {
		var arr = Array.prototype.slice.call(arguments, 0);
		for(var i = 0, l = arr.length; i < l; i++)
			arr[i] = this.exec(arr[i], this.resource);
		arr.unshift(null);
		this.callback.apply(null, arr);
	}
}