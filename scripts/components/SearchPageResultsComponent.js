var React = require("react");
var searchPageTitle = "";
var _ = require("backbone/node_modules/underscore");

module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;

		if(this.props.query !== "undefined"){
			var parseQuery = {title: {
				$regex: ".*"+this.props.query+".*",
				$options: "i"
			}}
			searchPageTitle = this.props.query;
		} else if(this.props.categoryToSearch !== "undefined"){
			var parseQuery = {category: this.props.categoryToSearch}
			searchPageTitle = this.props.categoryToSearch;
		}
		
		this.props.threads.fetch({
			query: parseQuery,
			success:function(data){
				that.setState({title: searchPageTitle});
			}
		});
	},
	getInitialState: function(){
		return {
			title: ""
		}
	},
	render: function(){	
		console.log("should be reversed", this.props.threads.models.reverse());

		var limitedList = _.first(this.props.threads.models, 10);
			var sortedLimitedList = _.sortBy(limitedList,function(model){
				var date = new Date(model.get("createdAt"));
				return -1*date.getTime();
			});
		var queriedThreads = sortedLimitedList.map(function(model){
			return (
				<div className="text-center container well" key={model.cid}>
					<h3>{model.attributes.title}</h3>
					<p>{model.attributes.body}</p>
					<p>{model.attributes.category}</p>
				</div>
			);
		});
		{
			if(queriedThreads.length === 0 ){
				queriedThreads = <h2>No results found!</h2>
			}
		}
		return (
			<div className="text-center">
				<h1>{this.state.title} search results!</h1>
				{queriedThreads}
			</div>
		);
	},
	shouldComponentUpdate: function(){
		return true;
	},
	componentWillReceiveProps: function(nextProps){
		var that = this;
		this.props.threads.fetch({
			query: {
				title: {
					$regex: ".*"+nextProps.query+".*",
					$options: "i"
				}
			},
			success:function(data){
				that.setState({title: nextProps.query});
				that.forceUpdate();
			}
		});
	}	
});