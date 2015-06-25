var React = require("react");

module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		this.props.threads.fetch({
			query: {
				title: {
					$regex: ".*"+this.props.query+".*",
					$options: "i"
				}
			},
			success:function(data){
				that.forceUpdate();
				console.log("look here for new data: ",data);
			}
		});
	},
	render: function(){
		console.log("im running");
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
				<h1>{this.props.query} search results!</h1>
				{queriedThreads}
			</div>
		);
	},
	shouldComponentUpdate: function(){
		return true;
	},
	componentWillUpdate: function(nextProps){
		console.log("will be updating with ",nextProps);
	},
	componentWillReceiveProps: function(nextProps){
		console.log("will receive", nextProps);
		var that = this;
		this.props.threads.fetch({
			query: {
				title: {
					$regex: ".*"+nextProps.query+".*",
					$options: "i"
				}
			},
			success:function(data){
				that.forceUpdate();
				console.log("look here for new data: ",data);
			}
		});
	}	
});