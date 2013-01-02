function Throttler (callback){
	this.callback = callback;
};

Throttler.prototype = {
	queue : function (query) {
		clearTimeout(this.timer);
		var callback = this.callback;
		this.timer = setTimeout(function(){
			callback(query);
		}, 100);
	}
};