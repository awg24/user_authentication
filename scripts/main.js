var React = require("react");
var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});

var UserCollection = require("./collections/UserCollection");
var userCollection = new UserCollection();

var LoginIn = require("./components/LoginFormComponent");
var Register = require("./components/RegisterComponent");
var NavBar = require("./components/NavBarComponent");
var ProfilePage = require("./components/ProfilePageComponent");

var containerEl = document.getElementById("container");

var App = Backbone.Router.extend({
	routes: {
		"":"login",
		"login": "login",
		"register":"register",
		"profile": "login",
		"profile/:user": "profile"
	},
	login: function(){
		React.render(
			<div>
				<NavBar />
				<LoginIn routing={myRoutes} />
			</div>
			, containerEl
		);
	},
	register: function(){
		React.render(
			<div>
				<NavBar/>
				<Register routing={myRoutes} />
			</div>
			, containerEl
		);
	},
	profile: function(user){
		console.log(userCollection);
		//var loggedInUser = userCollection.findWhere({username: user});
		//console.log(loggedInUser);
		// if(loggedInUser){
			React.render(<ProfilePage routing={myRoutes} userLoggedIn={user}/>, containerEl);
		// } else {
		// 	React.render(
		// 		<div>
		// 			<NavBar />
		// 			<LoginIn routing={myRoutes} />
		// 		</div>
		// 		, containerEl
		// 	);
		// }

	}
});

var myRoutes = new App();
Backbone.history.start();
