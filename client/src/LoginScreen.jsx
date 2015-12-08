var React = require('react');

require("../src/login.css");

var LoginScreen = React.createClass({
	getInitialState: function() {
		return {
			username:'',
			password:''
		};
	},
	handleUsernameChange: function(e) {
		this.setState({username:e.target.value});
	},
	handlePasswordChange: function(e) {
		this.setState({password:e.target.value});
	},
	render: function() {
		return (
			<div className="login-container">
				<h2>Log in</h2>
				<form className="login" onSubmit={this.handleSubmit}>
					<input type="input" name="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}></input><br/>
					<input type="input" name="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br />
					<input type="submit" name="submit" value="login"></input>
				</form>
			</div>
		);
	},
	handleSubmit: function( e ) {
		e.preventDefault();
		var u = this.state.username.trim();
		var p = this.state.password.trim();

		if(!u || !p) return;

		var data = JSON.stringify({
			'user':u,
			'pass':p
		});
		$.ajax({
			url:'/login',
			contentType:'application/json',
			dataType:'json',
			type:'POST',
			data:data,
			success: function(data) {
				try{
					data = JSON.parse(data);
				} catch(err){
					console.log(err.toString());
				} finally {
					if(data.success="true"){
						this.transitionTo('cats')
					}
				}
			}.bind(this),
			error:function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
});

module.exports = LoginScreen;
