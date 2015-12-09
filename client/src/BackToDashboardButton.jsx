var React = require('react'),
  Router = require('react-router'),
  Button = require('react-bootstrap').Button;

var BackToDashboardButton = React.createClass({
	handleClick: function() {
		window._router.transitionTo('manufacturer_dashboard');
	},
	render: function() {
		return (
			<Button bsStyle="primary" onClick={this.handleClick}>Back</Button>
		);
	}
});

module.exports = BackToDashboardButton;