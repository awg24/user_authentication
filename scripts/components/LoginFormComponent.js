var React = require("react");
var UserModel = require("../models/UserModel");

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
					<form className="form-horizatonal" onSubmit={this.validateExistingUser}>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Username</label>
							<input placeholder="Your Username" ref="username" className="form-control" type="text"/>
						</div><br/>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-12 control-label">Password</label>
							<input placeholder="Your Password" ref="password" className="form-control" type="password"/>
							<span className="errors">{this.state.errors.username}</span><br/>
						</div><br/>
							<button className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		);
	},
	validateExistingUser: function(event){
		event.preventDefault();
		var that = this;
		var errors = {};

		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value
		if(!username || !password){
			 errors.username = "*Cannot login with blank fields";
			 this.setState({errors: errors})
		} else {
			this.props.user.login({
			    username: username,
			    password: password
			}, {
			    success: function(userModel) {
			        console.log('user was logged in');
			        that.props.routing.navigate("profile/"+username, {trigger: true});
			    },
			    error: function(userModel, response) {
			        errors.username = "*Username or password is incorrect";
			        that.setState({errors: errors})
			    }
			})
				}
		}
});