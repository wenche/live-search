buster.testCase("List builder", {
	setUp : function () {
		this.root = document.createElement("form");
		this.builder = new ListBuilder(this.root);
	},

	"adds ol element to root with class name live-search-results" : function () {
		this.builder.render(["Robocop"]);
		assert.equals(this.root.childNodes.length, 1);
		assert.tagName(this.root.firstChild, "ol");
		assert.className(this.root.firstChild, "live-search-results");
	},
	"does not remove existing elements" : function () {
		this.root.appendChild(document.createElement("fieldset"));
		this.builder.render(["Robocop"]);
		assert.equals(this.root.childNodes.length, 2);
	},
	"does not add multiple lists" : function () {
		this.builder.render(["Robocop"]);
		this.builder.render(["Robocop II"]);
		assert.equals(this.root.childNodes.length, 1);
	},
	"renders items as list item elements" : function () {
		this.builder.render(["Robocop", "Robocop II", "Robocop III"]);
		var list = this.root.firstChild;

		assert.equals(list.childNodes.length, 3);
		assert.equals(list.childNodes[0].innerHTML, "Robocop");
		assert.equals(list.childNodes[1].innerHTML, "Robocop II");
	},
	"multiple renders should discard previous list items" : function () {
		this.builder.render(["Robocop", "Robocop II", "Robocop III"]);
		this.builder.render(["Terminator"]);

		var list = this.root.firstChild;

		assert.equals(list.childNodes.length, 1);
		assert.equals(list.childNodes[0].innerHTML, "Terminator");
	}
 });