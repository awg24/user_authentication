var React = require("react");
var UserModel = require("../models/UserModel.js");
var validator = require("validator");
var _ = require("backbone/node_modules/underscore");
var UserCollection = require("../collections/UserCollection");
var userCollection = new UserCollection();

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
		var newPassword = this.refs.newPassword.getDOMNode().value;
		var newEmail = this.refs.newEmail.getDOMNode().value;

		this.props.user.set("username", newUsername);
		this.props.user.set("email", newEmail);
		this.props.user.set("password", newPassword);


		if(!newUsername|| !newPassword || !newEmail || !confirm){
			if(!this.props.user.get("username")){
				errors.username = "*You must not leave this field blank";
			}
			if(!this.props.user.get("email")){
				errors.email = "*You must not leave this field blank";
			}
			if(!this.props.user.get("password")){
				errors.password = "*You must not leave this field blank";
			}
			if(!confirm){
				errors.confirmPassword = "*You must not leave this field blank";
			}
		} else {
			if(!validator.isEmail(newEmail)){
				errors.email = "*Must be a valid email";
			}
			if(!validator.isAlphanumeric(newUsername)){
				errors.username = "*Username must only contain numbers and letters";
			}
			if(confirm !== newPassword){
				errors.confirmPassword = "*Passwords do not match";
			} else if(newPassword.length <= 3){
				errors.passwordLength = "*Password must much longer than 3 characters";
			}
		}

		if(_.isEmpty(errors)){
			var that = this;
			this.props.user.save(null,
				{error: function(data,error) {
					switch(error.responseJSON.code){
						case 202:
						errors.username = error.responseJSON.error;
						that.setState({errors: errors});
						break;
						case 203:
						errors.email = error.responseJSON.error;
						that.setState({errors: errors});
						break;
					}
				},
				success: function(){
					that.props.user.login({
					    username: that.props.user.get("username"),
					    password: that.props.user.get("password")
					}, {
					    success: function(userModel) {
					    	that.forceUpdate();
					        that.props.routing.navigate("home/"+that.props.user.get("username"), {trigger: true});
					    },
					    error: function(userModel, response) {
					        errors.username = "*Username or password is incorrect";
					        that.setState({errors: errors})
					    }
					});
				}
			});

		} else {
			this.setState({errors: errors});
		}
	}
});
