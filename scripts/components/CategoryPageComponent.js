var React = require("react");

module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		this.props.threads.fetch({
			query: {
				category: this.props.topic
			},
			success:function(data){
				that.forceUpdate();
			}
		});
	},
	render: function(){
		var queriedThreads = this.props.threads.map(function(model){
			console.log(model);
			return (
				<div className="text-center container well" key={model.cid}>
					<h3>{model.attributes.title}</h3>
					<p>{model.attributes.body}</p>
					<p>{model.attributes.category}</p>
				</div>
			);
		});
		return (
			<div className="text-center">
				<h1>{this.props.topic} Topics!</h1>
				{queriedThreads}
			</div>
		);
	}
});