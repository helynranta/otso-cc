var React = require('react'),
  Router = require('react-router'),
  Button = require('react-bootstrap').Button;

var BackToDashboardButton = React.createClass({
	handleClick: function() {
		console.log(window._prevPath)
		if(window._prevPath.length > 0) {
			window._prevPath.pop();
			window._router.transitionTo(window._prevPath[window._prevPath.length-1]);
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
