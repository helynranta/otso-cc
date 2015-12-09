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
                <button className="btn btn-raised btn-warning back-button" id="back-button" onClick={this.handleClick}>Back</button>
            </div>
		);
	}
});

module.exports = BackToDashboardButton;
