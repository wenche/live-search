buster.testCase("Live search", {
	setUp : function() {
		this.server = this.useFakeServer();
		this.clock = this.useFakeTimers();
	} ,

	"displays suggestions as user types" : function () {
		/*:DOC form = <form action="/search" method="get">
			<fieldset>
				<input type="search" name="q" id="q" />
				<input type="submit" value="Search" />
			</fieldset>	
		</form>*/

		var form = jQuery(this.form).liveSearch();
		var input = form.find("input[type='search']");

		this.server.respondWith(
			"GET", /\/search\?q=.*/,
			[200, { "Content-Type" : "application/json"},
			'["Robocop", "Robocop II", "Robocop III"]']
		);

		input.val("R");
		input.trigger("keyup");
		this.clock.tick(50);

		input.val("Ro");
		input.trigger("keyup");
		this.clock.tick(50);

		input.val("Rob");
		input.trigger("keyup");
		this.clock.tick(50);

		input.val("Robo");
		input.trigger("keyup");
		this.clock.tick(50);

		this.server.respond();
		var results = form.find("ol.live-search-results li");
		assert.equals(results.length, 0);

		input.val("Roboc");
		input.trigger("keyup");
		this.clock.tick(100);

		this.server.respond();
		results = form.find("ol.live-search-results li");
		assert.equals(results.length, 3);
		assert.equals(results[0].innerHTML, "Robocop");

	}
});