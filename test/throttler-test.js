buster.testCase("Throttler", {
	setUp : function () {
		this.server = this.useFakeServer();
		this.clock = this.useFakeTimers();

		this.callback = sinon.spy();
		this.throttler = new Throttler(this.callback);

	},
	"does not call callback immediately" : function () {
		
		this.throttler.queue("R");
		refute.called(this.callback);
	},
	"calls callback after 100ms" : function () {
		this.throttler.queue("R"),
		this.clock.tick(100);

		assert.calledOnce(this.callback);
	},
	"should discard previously queued callback" : function () {
		this.throttler.queue("R");
		this.clock.tick(50);
		this.throttler.queue("Ro");
		this.clock.tick(100);

		assert.calledOnce(this.callback);
		assert.calledWith(this.callback, "Ro");
	}
});