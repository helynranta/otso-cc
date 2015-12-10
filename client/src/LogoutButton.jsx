var React = require('react'),
	Button = require('react-bootstrap').Button;

var LogoutButton = React.createClass({
	handleClick: function() {
		this.props.logIn(false);
	},
	render: function() {
		if (this.props.loggedIn) {
			return (
				<button className="btn" id="btn-logout" onClick={this.handleClick}>
					<i className="material-icons">face</i>
				</button>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = LogoutButton;