var React = require("react");
var searchPageTitle = "";

module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;

		console.log("query: ",this.props.query, "cateogry searcgh",this.props.categoryToSearch)

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
				that.forceUpdate();
				console.log("look here for new data: ",data);
			}
		});
	},
	getInitialState: function(){
		return {
			title: ""
		}
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
				that.setState({title: nextProps.query});
				that.forceUpdate();
				console.log("look here for new data: ",data);
			}
		});
	}	
});