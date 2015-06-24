var React = require("react");
var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});

// var UserCollection = require("./collections/UserCollection");
// var userCollection = new UserCollection();
var UserModel = require("./models/UserModel");

var LoginIn = require("./components/LoginFormComponent");
var Register = require("./components/RegisterComponent");
var NavBar = require("./components/NavBarComponent");
var ProfilePage = require("./components/ProfilePageComponent");
var ThreadPage = require("./components/ThreadPostComponent");

var containerEl = document.getElementById("container");
var NavEl = document.getElementById("navigation-element");

var user = new UserModel();

React.render(<NavBar user={user}/>, NavEl);

var App = Backbone.Router.extend({
	routes: {
		"":"login",
		"login": "login",
		"register":"register",
		"profile": "login",
		"profile/:user": "profile",
		"thread/:threadID": "thread"
	},
	login: function(){
		React.render(
			<div>
				<LoginIn user={user} routing={myRoutes} />
			</div>
			, containerEl
		);
	},
	register: function(){
		React.render(
			<div>
				<Register user={user} routing={myRoutes} />
			</div>
			, containerEl
		);
	},
	profile: function(user1){
		React.render(
			<div>
				<ProfilePage user={user} routing={myRoutes} userLoggedIn={user1}/>
			</div>
			, containerEl);
	},
	thread: function(threadID){
		React.render(
			<div>
				<ThreadPage user={user} threadId={threadID} routing={myRoutes}/>
			</div>
			, containerEl);
	}
});

var myRoutes = new App();
Backbone.history.start();





