var React = require("react");
var tempForNav;


module.exports = React.createClass({
	componentWillMount: function () {
		this.props.user.on('change', function() {
			this.forceUpdate();
		}, this);
	},
	render: function(){
		var link = [];
		var search = [];

		if(this.props.user.id){
			link.push(<li key={5}><a href={"#home/"+this.props.user.attributes.username}>Home</a></li>);
			link.push(<li key={3}><a onClick={this.logOut} href="#login">Logout</a></li>);
			link.push(<li key={4}><a href={"#postThread/"+this.props.user.attributes.username}>New Thread!</a></li>);
			search.push(<form key={6} className="navbar-form navbar-left" role="search">
							<div className="form-group">
								<input ref="searchQuery" type="text" className="form-control" placeholder="Search"/>
							</div>
							<button onClick={this.searchPosts} type="submit" className="btn btn-default">Submit</button>
						</form>);
		} else {
			link.push(<li key={1}><a href="#login">Login</a></li>);
			link.push(<li key={2}><a href="#register">Resgister</a></li>);
		}		
		return (		
			<nav className="navbar add-border navbar-default">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							{link}
							{search}
						</ul>
						 
					</div>
				</div>
			</nav>
		);
	},
	logOut: function(){
		this.props.user.logout();
		this.props.user.clear();
	},
	searchPosts: function(){
		var that = this;
		var search = this.refs.searchQuery.getDOMNode().value;
		if(search){
			that.props.routing.navigate("search/"+search+"/"+tempForNav, {trigger: true});
		}
	}
});