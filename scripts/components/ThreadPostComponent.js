var React = require("react");
var ThreadModel = require("../models/ThreadModel");

module.exports = React.createClass({
	getInitialState: function(){
		var that = this;
		var thread = new ThreadModel({
			objectId: this.props.threadId
		});

		thread.fetch();

		thread.on("change", function(data){
			console.log(data);
			that.forceUpdate();
		});

		return {
			post: thread
		};
	},
	render: function(){
		return (
			<div>
				<h1>{this.state.post.get("title")}</h1>
				<div>{this.state.post.get("body")}</div>
			</div>
		);
	}
});