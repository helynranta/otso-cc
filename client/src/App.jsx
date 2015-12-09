var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  Navigation = Router.Navigation,
  Link = Router.Link;

  require('react-bootstrap');
  require('../src/style.css');

var LoginScreen = require('./LoginScreen.jsx'),
    CreateOrder = require('./CreateOrder.jsx'),
	SubcontractorsScreen = require('./SubcontractorsScreen.jsx'),
	LogoutButton = require('./LogoutButton.jsx'),
	SubcontractorScreen = require('./SubcontractorScreen.jsx'),
	ManufacturerDashboard = require('./ManufacturerDashboard.jsx');


var App = React.createClass({
	mixins: [Router.State, Navigation],
	getInitialState: function () {
		return {
			loggedIn: true,
			group: 0
		}
	},
	logIn: function (_state, _group) {
		this.setState({
	      loggedIn: _state,
	      group: _group || 2
	    });


	    if (_state) {
	    	switch (_group) {
	    		case 0: this.transitionTo('manufacturer_dashboard');
	    		// transition to different places for other users
	    	}
	    }
	},
	render: function () {
		let $this = this;

		return (
			<div className="container">
				<div className="header clearfix">

					<ul className="nav nav-pills pull-right nav-logout">
                        <li role="presentation">
                             <Link to="createorder">+Assignment</Link>
                        </li>
			            <li role="presentation" className="active" id="nav-logout-li">
			            	<LogoutButton loggedIn={this.state.loggedIn} logIn={this.logIn} />
			            </li>
	          		</ul>
	          		<h3 className="text-muted">
                        <Link to="manufacturer_dashboard">Code camp</Link>
                    </h3>
				</div>
				<div id="content" className="jumbotron">
					{$this.state.loggedIn ? <RouteHandler /> : <LoginScreen logIn={$this.logIn} />}
				</div>
			</div>
		);
	}
});

var routes = (
	<Route name="app" path="/" handler={App} >
		<Route name="loginscreen" path="/login" handler={LoginScreen} />
        <Route name="createorder" path="/createorder" handler={CreateOrder} />
        <Route name="manufacturer_dashboard" path="/dashboard" handler={ManufacturerDashboard} />
		<Route name="subcontractors" path="/subcontractors" handler={SubcontractorsScreen} />
		<Route name="subcontractor" path="/subcontractor/:id" handler={SubcontractorScreen} />
	</Route>
);

window._router = Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById("body"));
});