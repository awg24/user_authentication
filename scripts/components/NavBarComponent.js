var React = require("react");


module.exports = React.createClass({
	componentWillMount: function () {
	    this.props.user.on('change', function() {
	    	console.log('user changed nav');
	    	console.log(this);
	    	this.forceUpdate();
	    }, this);
	},
	render: function(){
		var link = [];
		console.log(this.props.user);
		if(this.props.user.id){
			link.push(<li key={3}><a onClick={this.logOut} href="#login">Logout</a></li>);
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
						</ul>
					</div>
				</div>
			</nav>
		);
	},
	logOut: function(){
		this.props.user.clear();
	}
});