var React = require('react');

var SubcontractorElement = React.createClass({
	render: function() {
		let imgStyle = {
			width: '140px',
			height: '140px'
		};

		return (
			<div className="col-lg-4">
				<img style={imgStyle} className="img-circle" src="http://www.newyorker.com/wp-content/uploads/2014/08/Stokes-Hello-Kitty2-1200.jpg" />
				<h2>Kitty</h2>
				<p>Meow meow</p>
			</div>
		);
	}
});

module.exports = SubcontractorElement;