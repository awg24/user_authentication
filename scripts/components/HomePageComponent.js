var React = require("react");
var ThreadCollection = require("../collections/ThreadCollection");
var temp;


module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		this.props.threads.fetch({
			success:function(data){
				that.forceUpdate();
			}
		});
	},
	render: function(){
		console.log("from render ",this.props.threads);
		if(this.props.threads.length !== 0){
			var allThreads = this.props.threads.map(function(model){
				console.log(model)
				return <div className="text-center container well" key={model.cid}>
							<h3>{model.attributes.title}</h3>
							<p>{model.attributes.body}</p>
							<p><a href={"#search/"+temp+"/"+model.attributes.category}>{model.attributes.category}</a></p>
						</div>
			});
		} else {
			var allThreads = "You have seem to have made a thread yet!"
		}
		return (
			<div className="text-center">
				<h1> All Posts </h1>
				{allThreads}
			</div>
		);
	}

});