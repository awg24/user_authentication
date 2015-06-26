var React = require("react");
var searchPageTitle = "";

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
				that.forceUpdate();
			}
		});
	},
	getInitialState: function(){
		return {
			title: ""
		}
	},
	render: function(){
		var queriedThreads = this.props.threads.map(function(model){
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