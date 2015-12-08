var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  Button = require('react-bootstrap').Button;

  require('react-bootstrap');
  require('../src/style.css');

var LoginScreen = require('./LoginScreen.jsx'),
	CategoriesScreen = require('./CategoriesScreen.jsx'),
	LogoutButton = require('./LogoutButton.jsx');

var App = React.createClass({
	mixins: [Router.State],
	getInitialState: function () {
		return {
			loggedIn: false,
			group: 2
		}
	},
	logIn: function (_state, _group) {
		this.setState({
      loggedIn: _state,
      group: _group || 2
    });
	},
	render: function () {
		let $this = this;

		return (
			<div className="container">
				<div className="header clearfix">

					<ul className="nav nav-pills pull-right nav-logout">
            <li role="presentation" className="active" id="nav-logout-li">

            </li>
          </ul>
          <h3 className="text-muted">Code camp</h3>
				</div>
				<div className="jumbotron">
					{$this.state.loggedIn ? <RouteHandler /> : <LoginScreen logIn={$this.logIn} />}
				</div>
			</div>
		);
	},
	componentDidMount: function() {
		React.render(<LogoutButton loggedIn={this.state.loggedIn} logIn={this.logIn} />, document.getElementById('nav-logout-li'));
	}
});

var routes = (
  <Route name="app" path="/" handler={App} >
  	<Route name="loginscreen" path="/login" handler={LoginScreen} />
  	<Route name="categories" path="/cats" handler={CategoriesScreen} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById("body"));
});
