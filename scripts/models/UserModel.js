var React = require("react");
var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});
Backbone.$ = require("jquery");
var validator = require("validator");

module.exports = Backbone.Model.extend({
	defaults: {
		username: null,
		email: null,
		password: null
	},
	parseClassName: "_User",
    idAttribute: "objectId",
    isUser: true
});