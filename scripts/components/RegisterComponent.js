var React = require("react");
var UserModel = require("../models/UserModel.js");
var validator = require("validator");
var _ = require("backbone/node_modules/underscore");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors: {}
		};
	},
	render: function(){
		return (
			<div>
				<div className="well add-border center-block text-center container small">
					<span className="errors">{this.state.errors.blank}</span><br/>
					<form className="form-horizatonal" onSubmit={this.createNewUser}>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Email</label> 
							<input placeholder="Example@example.com" ref="newEmail" className="form-control" type="text"/>
							<span className="errors">{this.state.errors.email}</span><br/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Username</label>
							<input placeholder="Username" ref="newUsername" className="form-control" type="text"/>
							<span className="errors">{this.state.errors.username}</span><br/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Password</label>
							<input placeholder="hunter2" ref="newPassword" className="form-control" type="password"/>
							<span className="errors">{this.state.errors.password}</span><br/>
							<span className="errors">{this.state.errors.passwordLength}</span><br/>
						</div><br/>
						<div className="form-group">
							<label className="col-sm-12 control-label">Confirm Password</label>
							<input placeholder="hunter2" ref="confirmPassword" className="form-control" input type="password"/>
							<span className="errors">{this.state.errors.confirmPassword}</span><br/>
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
		var newUsername = this.refs.newUsername.getDOMNode().value;
		var newPassword = this.refs.newEmail.getDOMNode().value;
		var newEmail = this.refs.newPassword.getDOMNode().value;

		var user = new UserModel({
			username: newUsername,
			email: newPassword,
			password: newEmail
		});

		if(!user.get("username") || !user.get("password") || !user.get("email") || !confirm){
			if(!user.get("username")){
				errors.username = "*You must not leave this field blank";
			}
			if(!user.get("email")){
				errors.email = "*You must not leave this field blank";
			}
			if(!user.get("password")){
				errors.password = "*You must not leave this field blank";
			}
			if(!confirm){
				errors.confirmPassword = "*You must not leave this field blank";
			}		
		} else {
			if(!validator.isEmail(user.get("email"))){
				errors.email = "*Must be a valid email";
			}
			if(!validator.isAlphanumeric(user.get("username"))){
				errors.username = "*Username must only contain numbers and letters";
			}
			if(confirm !== user.get("password")){
				errors.confirmPassword = "*Passwords do not match";
			} else if(user.get("password").length <= 3){
				errors.passwordLength = "*Password must much longer than 3 characters";
			}
		}

		if(_.isEmpty(errors)){
			var that = this;
			user.save(null,
				{error: function(data,error) {
					switch(error.responseJSON.code){
						case 202:
						errors.username = "*Username is taken";
						that.setState({errors: errors});
						break;
						case 203:
						errors.email = "*Email is already being used";
						that.setState({errors: errors});
						break;
					}
				},
				success: function(){
					that.props.routing.navigate("profile", {trigger: true});
				}
			});
			
		} else {
			this.setState({errors: errors});
		}
	}
});