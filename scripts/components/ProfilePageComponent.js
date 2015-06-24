var React = require("react");
var _ = require("backbone/node_modules/underscore");
var Backbone = require("backbone")
var ThreadModel = require("../models/ThreadModel");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors:{}
		};
	},
	render: function(){
		return(
			<div>
				<form onSubmit={this.postThread}>
					<h2>Post a new thread, {this.props.userLoggedIn}!</h2>
					Title:<input ref="threadTitle" type="text"/>
					<span className="errors">{this.state.errors.title}</span><br/>
					Body:<textarea ref="body"></textarea>
					<span className="errors">{this.state.errors.body}</span><br/>
					<button type="submit">Post</button>
				</form>
			</div>
		);
	},
	postThread: function(event){
		event.preventDefault();
		var that = this;
		var errors = {};
		var threadModel = new ThreadModel({
			title: this.refs.threadTitle.getDOMNode().value,
			body: this.refs.body.getDOMNode().value
		});

		if(!threadModel.get("title")){
			errors.title = "Title missing!"
		}
		if(!threadModel.get("body")){
			errors.body = "Body missing!"
		}

		if(_.isEmpty(errors)){
			threadModel.save(null,{
				success: function(data){
					console.log(data);
					that.props.routing.navigate("thread/"+data.id, {trigger: true});
				},
				error: function(){
					console.log("not that you dont know.. but it didnt work")
				}
			});
			console.log("Im gonna save!");
		} else {
			this.setState({errors: errors});
		}
	}
});