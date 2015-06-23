var React = require("react");
var Backbone = require("backbone");
Backbone.$ = require("jquery");
var LoginIn = require("./components/LoginFormComponent");
var Register = require("./components/RegisterComponent");
var NavBar = require("./components/NavBarComponent");


var containerEl = document.getElementById("container");

var App = Backbone.Router.extend({
	routes: {
		"":"login",
		"login": "login",
		"register":"register",
		"profile": "profile"
	},
	login: function(){
		React.render(
			<div>
				<NavBar />
				<LoginIn />
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
	profile: function(){
		React.render(<div>Im a profile!</div>, containerEl);
	}
});

var myRoutes = new App();
Backbone.history.start();