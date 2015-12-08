var React = require('react'),
	Button = require('react-bootstrap').Button;

var LogoutButton = React.createClass({
	render: function() {
		if (this.props.loggedIn) {
			return (
				<Button bsStyle="primary" onClick={this.props.logIn.bind(this, false)}>Logout</Button>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = LogoutButton;