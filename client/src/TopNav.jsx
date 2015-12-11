var React = require('react');

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

var TopNav = React.createClass({
	render: function() {
		let imgStyle = {
			width: '40px',
			height: '40px'
		};

		return (
			<nav className="navbar navbar-fixed-top nav-top">
				<div>
					 <BackToDashboardButton />
				</div>
				<div className="header-page">
					<h4>{this.props.pageName}</h4>
				</div>
				<div className="current-user">
					{this.props.loggedIn ?	
						<div>
							<img className="img-circle" style={imgStyle} src="icons/04.jpg" />
							<span> {this.props.user}</span>
						</div>
					: '' }
				</div>
			</nav>
		);
	}
});

module.exports = TopNav;