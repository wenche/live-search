jQuery.fn.liveSearch = function () {
	this.each(function () {
		var builder = new ListBuilder(this);

		var requester = new Throttler(function (query) {
			jQuery.ajax({
			  url: '/search?q=' + query,
			  type: 'GET',
			  success: function(data, textStatus, xhr) {
			    builder.render(data);
			  }
			});
			
		});
		
		jQuery(this).find("input[type='search']").bind("keyup", function () {
			requester.queue(this.value);
		});
	});
	return this;
};