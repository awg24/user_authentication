var React = require("react");

module.exports = React.createClass({
	render: function(){
		return(
			<div>
				<h2>{this.props.userLoggedIn} &#39;s Profile</h2>
			</div>
		);
	}
});