var React = require("react");
var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});
Backbone.$ = require("jquery");

module.exports = Backbone.Model.extend({
	defaults: {
		username: null,
		email: null,
		password: null
	},
	validate: function(attr){
		
	},
	parseClassName: "_User",
    idAttribute: "objectId",
    isUser: true
});22