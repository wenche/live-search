var config = module.exports;

config["Browser tests"] = {
	extensions : [require("buster-html-doc")],
	libs : ["lib/*.js"],
	src : ["src/*.js"],
	tests: ["test/*.js"]
}
