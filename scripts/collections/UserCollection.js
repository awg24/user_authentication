var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});
Backbone.$ = require("jquery");
var UserModel = require("../models/UserModel");

module.exports = Backbone.Collection.extend({
	model: UserModel,
	parseClassName: "_User"
});