var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  Grid = require('react-bootstrap').Grid,
  Row = require('react-bootstrap').Row,
  Col = require('react-bootstrap').Col;

  require('react-bootstrap');

var LoginScreen = require('./LoginScreen.jsx'),
	CategoriesScreen = require('./CategoriesScreen.jsx');

var App = React.createClass({
	mixins: [Router.State],
	render: function() {
		return (
			<div className="container">
				<div className="header clearfix">
					<h3 className="text-muted">Code camp</h3>
				</div>
				<div className="jumbotron">
					<RouteHandler />
				</div>
			</div>
		);
	}
});

var routes = (
  <Route name="app" path="/" handler={App} >
  	<Route name="categories" path="/cats" handler={CategoriesScreen} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById("body"));
});