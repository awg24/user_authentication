var React = require("react");
var Backbone = require("backparse")({
    appId: "JzJoSsUj4fip0vDgKJSfmSa1aUoDm5JGaTbhHgUD",
    apiKey: "msnXS15rnVRaH0syEN1ej94ce4YzWM96cFirnafy",
    apiVersion: 1
});

// var UserCollection = require("./collections/UserCollection");
// var userCollection = new UserCollection();
var UserModel = require("./models/UserModel");
var ThreadCollection = require("./collections/ThreadCollection");

var LoginIn = require("./components/LoginFormComponent");
var Register = require("./components/RegisterComponent");
var NavBar = require("./components/NavBarComponent");
var PostThread = require("./components/PostThreadComponent");
var ThreadPage = require("./components/ThreadPostComponent");
var HomePage = require("./components/HomePageComponent");
var SearchPage = require("./components/SearchPageResultsComponent");

var containerEl = document.getElementById("container");
var NavEl = document.getElementById("navigation-element");

var user = new UserModel();
var threads = new ThreadCollection();



var App = Backbone.Router.extend({
	routes: {
		"":"login",
		"login": "login",
		"register":"register",
		"profile": "login",
		"postThread/:user": "postThread",
		"thread/:threadID": "thread",
		"home/:user":"home",
		"category/:cate":"category",
		"search/:query/:cateogry":"search"
	},
	login: function(){
		React.render(
			<div>
				<LoginIn user={user} routing={this} />
			</div>
			, containerEl
		);
	},
	home: function(user){
		React.render(
			<div>
				<HomePage user={user} threads={threads} routing={this} />
			</div>
			, containerEl
		);
	},
	register: function(){
		React.render(
			<div>
				<Register user={user} routing={this} />
			</div>
			, containerEl
		);
	},
	postThread: function(user1){
		React.render(
			<div>
				<PostThread user={user} routing={this} userLoggedIn={user1}/>
			</div>
			, containerEl);
	},
	thread: function(threadID){
		React.render(
			<div>
				<ThreadPage user={user} threadId={threadID} routing={this}/>
			</div>
			, containerEl);
	},
	search: function(query, category){
		console.log("category from search:", category)
		React.render(
			<div><SearchPage query={query} categoryToSearch={category} threads={threads} /></div>
			, containerEl);
	}
});

var myRoutes = new App();

React.render(<NavBar user={user} routing={myRoutes}/>, NavEl);

Backbone.history.start();

user.me();





