var React = require("react");
var UserModel = require("../models/UserModel");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors: {}
		};
	},
	render: function(){
		console.log(this.state.errors);
		return (
			<div>
				<div className="well add-border center-block text-center container small">
					<span className="errors">{this.state.errors.blank}</span><br/>
					<form className="form-horizatonal" onSubmit={this.createNewUser}>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Email</label> 
							<input placeholder="Example@example.com" ref="newEmail" className="form-control" type="text"/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Username</label>
							<input placeholder="Username" ref="newUsername" className="form-control" type="text"/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Password</label>
							<input placeholder="hunter2" ref="newPassword" className="form-control" type="password"/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Confirm Password</label>
							<input placeholder="hunter2" ref="confirmPassword" className="form-control" input type="password"/>
						</div><br/>
							<button className="btn btn-primary">Sign Up</button>
					</form>
				</div>
			</div>
		);
	},
	createNewUser: function(event){
		event.preventDefault();
		var errors = {};
		var confirm = this.refs.confirmPassword.getDOMNode().value;
		console.log("confirm password:", confirm );
		 var user = new UserModel({
		 	username: this.refs.newUsername.getDOMNode().value,
		 	email: this.refs.newEmail.getDOMNode().value,
		 	password: this.refs.newPassword.getDOMNode().value
		 });

		 if(!user.username || !user.password || !user.email || !confirm){
		 	console.log("do i get called?");
		 	errors.blank = "*You must not leave fields blank";
		 	this.setState({errors: errors});
		 }
		 //user.save();
	}
});



















