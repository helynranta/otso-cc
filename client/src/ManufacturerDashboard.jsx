var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  RouteHandler = Router.RouteHandler,
  Navigation = Router.Navigation,
  Button = require('react-bootstrap').Button;

  require("../src/css/style.css");

var CreateOrder = require('./CreateOrder.jsx'),
	SubcontractorsScreen = require('./SubcontractorsScreen.jsx'),
	DashboardComments = require('./DashboardComments.jsx'),
	DashboardSubcontractors = require('./DashboardSubcontractors.jsx');

var ManufacturerDashboard = React.createClass({
	mixins: [Navigation],
	navigateOrder: function() {
		this.transitionTo('createorder');
	},
	navigateSubcontractors: function() {
		this.transitionTo('subcontractors');
	},
	navigateOrderList: function() {
		this.transitionTo('orders');
	},
	render: function() {
		return(
			<div>
				<div className="text-center">
					<h2>Dashboard</h2>
				</div>
				
				<div id="container-comments" className="text-center"></div>

				<div id="container-subcontractors" className="text-center"></div>
				
				{/*
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateSubcontractors}>Subcontractors</Button>
				</div>
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateOrderList}>Orders</Button>
				</div>
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateOrder}>Create order</Button>
				</div>
				*/}			
			</div>
		);
	},
	componentDidMount: function() {
		let sc_data,
			fb_data,
			ajaxes = [];

		ajaxes[0] = Promise.resolve($.ajax({
				url:'https://otso-cc-lasshi.c9users.io/subcontractors/rating/*',
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			sc_data = data;
		});

		ajaxes[1] = Promise.resolve($.ajax({
				url:'https://otso-cc-lasshi.c9users.io/feedback/',
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			fb_data = data;
		});

		Promise.all(ajaxes).then(() => {
			React.render(<DashboardComments data={fb_data} />, document.getElementById('container-comments'));
			React.render(<DashboardSubcontractors data={sc_data} />, document.getElementById('container-subcontractors'));
		});
	}
});

module.exports = ManufacturerDashboard;
