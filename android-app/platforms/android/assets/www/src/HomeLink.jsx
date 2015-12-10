var React = require('react');

var HomeLink = React.createClass({
	render: function() {
		let topLink;

		switch (this.props.group) {
			case 0:
				topLink = <a href="#">Paavo Sähkö</a>;
				break;
			case 1:
				topLink = <a href={`#/subcontractor/${this.props.user}`}>Paavo Sähkö</a>;
				break;
			default:
				topLink =  <a href="#/login">Paavo Sähkö</a>;
				break;
		}

		return topLink;
	}
});

module.exports = HomeLink;