var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<nav className="navbar add-border navbar-default">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li><a href="#login">Login</a></li>
							<li><a href="#register">Resgister</a></li> 
						</ul>
					</div>
				</div>
			</nav>
		);
	}
});