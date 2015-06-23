var React = require("react");
var UserModel = require("../models/UserModel");

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<div className="well add-border center-block text-center container small">
					<form className="form-horizatonal" onSubmit={this.validateExistingUser}>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Username</label>
							<input placeholder="Your Username" ref="newUsername" className="form-control" type="text"/>
						</div><br/>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Password</label>
							<input placeholder="Your Password" ref="newPassword" className="form-control" type="password"/>
						</div><br/>
							<button className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		);
	},
	validateExistingUser: function(event){
		event.preventDefault();
		console.log("yeah, he cool")
	}
});