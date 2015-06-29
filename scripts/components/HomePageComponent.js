var React = require("react");
var _ = require("backbone/node_modules/underscore");
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
		if(this.props.threads.length !== 0){
			var limitedList = _.first(this.props.threads.models.reverse(), 10);
			var sortedLimitedList = _.sortBy(limitedList,function(model){
				var date = new Date(model.get("createdAt"));
				console.log(date);
				return -1*date.getTime();
			});
			console.log(sortedLimitedList);
			var allThreads = sortedLimitedList.map(function(model){
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