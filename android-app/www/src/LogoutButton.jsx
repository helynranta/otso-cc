var React = require('react'),
	Button = require('react-bootstrap').Button;

var LogoutButton = React.createClass({
	handleClick: function() {
		this.props.logIn(false);
	},
	render: function() {
		if (this.props.loggedIn) {
			return (
				<Button bsStyle="primary" onClick={this.handleClick}>Logout</Button>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = LogoutButton;