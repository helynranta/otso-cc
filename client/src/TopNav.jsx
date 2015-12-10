var React = require('react');

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

var TopNav = React.createClass({
	render: function() {
		let imgStyle = {
			width: '40px',
			height: '40px'
		};

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<ul className="nav navbar-nav">
					<li id="logo" className="nav-logo">
					  <BackToDashboardButton />
					</li>
					<li role="presentation" className="active" id="username">
					{this.props.loggedIn ?	
						<div className="current-user">
							<img className="img-circle" style={imgStyle} src="icons/04.jpg" />
							<span> {this.props.user}</span>
						</div>
					: '' }
					</li>
				</ul>
			</nav>
		);
	}
});

module.exports = TopNav;