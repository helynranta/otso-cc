var React = require('react'),
  Router = require('react-router'),
  Route = Router.Route,
  RouteHandler = Router.RouteHandler,
  Navigation = Router.Navigation,
  Button = require('react-bootstrap').Button;

var CreateOrder = require('./CreateOrder.jsx'),
	SubcontractorsScreen = require('./SubcontractorsScreen.jsx');
	

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
				<div className="menu-item">
					<h2>Dashboard</h2>
				</div>
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateSubcontractors}>Subcontractors</Button>
				</div>
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateOrderList}>Orders</Button>
				</div>
				<div className="menu-item">
					<Button bsStyle="primary" onClick={this.navigateOrder}>Create order</Button>
				</div>
				<div className="menu-item">newest comments, best subcontractors or weather here</div>
				<img className="menu-item" src="http://i.imgur.com/XKjuVJn.png" width="500" />
			</div>
		);
	}
});

module.exports = ManufacturerDashboard;