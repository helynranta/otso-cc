var React = require('react'),
  Router = require('react-router'),
  Button = require('react-bootstrap').Button;

var BackToDashboardButton = React.createClass({
	handleClick: function() {
		window._router.transitionTo('manufacturer_dashboard');
	},
	render: function() {
		return (
            <div className="bs-component">
                <a id="back-button" className="btn btn-raised btn-warning" onClick={this.handleClick} href="javascript:void(0)">Back</a>
            </div>
		);
	}
});

module.exports = BackToDashboardButton;
