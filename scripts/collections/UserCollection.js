var Backbone = require('backparse')({
    appId: 'appidgoeshere',
    apiKey: 'parserestapikeygoeshere',
    apiVersion: 1
});
Backbone.$ = require("jquery");
var UserModel = require("../models/UserModel");

module.exports = Backbone.Collection.extend({
	model: UserModel,
	parseClassName: "_User"
});