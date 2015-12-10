var React = require('react'),
  Router = require('react-router'),
  Button = require('react-bootstrap').Button;

var BackToDashboardButton = React.createClass({
	handleClick: function() {
		if(window._prevPath.length > 1) {
			window._prevPath.pop();
			window._router.transitionTo(window._prevPath[window._prevPath.length-1]);
			window._prevPath.pop();
		}
	
	},
	render: function() {
		return (
            <div className="bs-component">
                <button className="btn" id="backButton" onClick={this.handleClick}>
                	<i className="material-icons">arrow_back</i>
                </button>
            </div>
		);
	}
});

module.exports = BackToDashboardButton;
