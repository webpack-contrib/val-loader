/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function() {
	if(this.inputValues) {
		var arr = Array.prototype.slice.call(this.inputValues, 0);
		arr.unshift(null);
		this.callback.apply(null, arr);
	} else {
		var arr = Array.prototype.slice.call(arguments, 0);
		for(var i = 0, l = arr.length; i < l; i++)
			arr[i] = this.exec(arr[i], this.filenames[i]);
		arr.unshift(null);
		this.callback.apply(null, arr);
	}
}
module.exports.seperable = true;