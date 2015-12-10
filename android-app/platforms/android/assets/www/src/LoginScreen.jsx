var React = require('react');

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
			<div className="well bs-component" id="login-container">
				<h2>Paavo Sähkö</h2>
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<legend>Login</legend>
					<div className="form-group">
						<label for="username" className="control-label">username</label>
						<input type="input" name="username" className="form-control" value={this.state.username} onChange={this.handleUsernameChange}></input><br/>
						<span className="material-input"></span>
					</div>
					<div className="form-group">
						<label for="password" className="control-label">password</label>
						<input type="input" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br />
						<span className="material-input"></span>
					</div>
					<input type="submit" name="submit" className="btn btn-primary" value="login"></input>
				</form>
			</div>
		);
	},
	handleSubmit: function( e ) {
		let $this = this;

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
					if(data['success']=="true"){
						$this.props.logIn(true, data.userinfo.login, data.userinfo.group);
					}
				}
			},
			error:function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}
		});
	}
});

module.exports = LoginScreen;
