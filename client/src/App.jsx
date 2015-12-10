var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  Navigation = Router.Navigation,
  Link = Router.Link;

  require('react-bootstrap');
  require('../src/css/style.css');
  require("../src/css/login.css");

var LoginScreen = require('./LoginScreen.jsx'),
    CreateOrder = require('./CreateOrder.jsx'),
	SubcontractorsScreen = require('./SubcontractorsScreen.jsx'),
	LogoutButton = require('./LogoutButton.jsx'),
	SubcontractorScreen = require('./SubcontractorScreen.jsx'),
	ManufacturerDashboard = require('./ManufacturerDashboard.jsx'),
	OrderListScreen = require('./OrderListScreen.jsx'),
	SubcontractorOrderScreen = require('./SubcontractorOrderScreen.jsx'),
	HomeLink = require('./HomeLink.jsx'),
	BackToDashboardButton = require('./BackToDashboardButton.jsx'),
	PageNames = require('./config.js').pages;


var App = React.createClass({
	mixins: [Router.State, Navigation],
	getInitialState: function () {
		return {
			loggedIn: true,
			user: 'admin',
			group: 0
		}
	},
	navigateOrder: function() {
		this.transitionTo('createorder');
	},
	navigateSubcontractors: function() {
		this.transitionTo('subcontractors');
	},
	navigateOrderList: function() {
		this.transitionTo('orders');
	},
	handleMenu : function() {
		window._router.transitionTo('/');
	},
	updatePrev: function(prevState) {
		console.log(this.state.prevState);	
	},
	logIn: function (_state, _user, _group) {

		this.setState({
	      	loggedIn: _state,
	      	user: _user || '',
	      	group: typeof _group === 'undefined' ? 2 : _group
	    });

	    if (_state && _group === 0) {
	    	this.transitionTo('manufacturer_dashboard');
	    } else if (_state && _group === 1) {
	    	this.transitionTo('subcontractor', {id : _user});
	    } else {
	    	this.transitionTo('loginscreen');
	    }
	},
	componentDidMount: function() {
		$.material.init();
	},
	render: function () {
		let $this = this,
			imgStyle = {
				width: '40px',
				height: '40px'
			},
		pageName = PageNames[this.getRoutes()[1].name] || this.getParams().id;
		let buttons = [
				<button className="btn" onClick={this.navigateSubcontractors}>
					<i className="material-icons">group</i>
				</button>,

				<button className="btn" onClick={this.navigateOrderList}>
					<i className="material-icons">&#xE547;</i>
				</button>,

				<button className="btn" onClick={this.navigateOrder}>
					<i className="material-icons">create</i>						
				</button>
		];
			
		return (
			<div className="bs-container">
				<nav className="navbar navbar-default navbar-fixed-top">
						<ul className="nav navbar-nav">
							<li id="logo" className="nav-logo">
							  <BackToDashboardButton />
							</li>
							<li role="presentation" className="active" id="username">
							{$this.state.loggedIn ?	
								<div className="current-user">
									<img className="img-circle" style={imgStyle} src="icons/04.jpg" />
									<span> {$this.state.user}</span>
								</div>
							: '' }
							</li>
						</ul>
				</nav>
				<br /><br />
				<div id="bs-container content" className="jumbotron">
					{$this.state.loggedIn ? <RouteHandler user={$this.state.user} group={$this.state.group} /> : <LoginScreen logIn={$this.logIn} />}
				</div>
				
				<footer>
					<nav className="card">
						<button className="btn" onClick={this.handleMenu}>
							<i className="material-icons">apps</i>
						</button>
						{$this.state.group == 0 ? buttons : ' '}
		            	<LogoutButton loggedIn={this.state.loggedIn} logIn={this.logIn} />
					</nav>
				</footer>
			</div>
		);
	}
});

var routes = (
	<Route name="app" path="/app" handler={App} >
		<Route name="loginscreen" path="/login" handler={LoginScreen} />
        <Route name="createorder" path="/createorder" handler={CreateOrder} />
        <Route name="orders" path="/orders" handler={OrderListScreen} />
        <Route name="sc_orders" path="/orders/:id" handler={SubcontractorOrderScreen} />
        <Route name="manufacturer_dashboard" path="/" handler={ManufacturerDashboard} />
		<Route name="subcontractors" path="/subcontractors" handler={SubcontractorsScreen} />
		<Route name="subcontractor" path="/subcontractor/:id" handler={SubcontractorScreen} />
	</Route>
);
window._prevPath = [];
window._router = Router.run(routes, function(Handler, state) {
	React.render(<Handler />, document.getElementById("body"));
	window._prevPath.push(state.path);
});
