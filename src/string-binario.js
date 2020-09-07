function StringToBinary(){
	this.reverse = function (str) {
		return str.replace(/[01]{8}/g, function(v){  return String.fromCharCode( parseInt(v,2) )  });
	}
	this.convert = function (str) {
		var d,arr = [];
		for (var i in str) {
			d = str.charCodeAt(i).toString(2);
			arr.push( new Array(9 - d.length).join('0') + d );
		}
		return arr;
	}
}