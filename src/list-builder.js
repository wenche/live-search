function ListBuilder (root) {
	this.root = root;
};

function toLiElement(item) {
	return "<li>" + item + "</li>";
}

ListBuilder.prototype = {
	//Array of items, use map with toLiElement callback
	render : function (items) {
		this.makeList().innerHTML = items.map(toLiElement).join("");

		this.root.appendChild(this.makeList());
	},
	makeList : function () {
		if (!this.list) {
			this.list = document.createElement("ol");
			this.list.className = ("live-search-results");
		}
		return this.list;
	}
};