var React = require('react');

require("../src/login.css");

var LoginScreen = React.createClass({
	render: function() {
		return (
			<div className="login-container">
				<h2>Log in</h2>
				<div className="login">
					<input type="input" name="username" placeholder="username"></input><br/>
					<input type="input" name="password" placeholder="password"></input><br />
					<input type="button" name="submit" value="login"></input>
				</div>
			</div>
		);
	},
	handleSubmit: function( data ) {
		$.ajax({
			url:'/login',
			dataType:'json',
			type:'POST',
			data:data,
			success: function(data) {

			}.bind(this),
			error:function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
});

module.exports = LoginScreen;
