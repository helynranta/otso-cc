var React = require('react');

var SubcontractorElement = React.createClass({
	render: function() {
		let imgStyle = {
			width: '140px',
			height: '140px'
		};

		return (
			<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
				<a href={`#/subcontractor/${this.props.data.id}`}>
					<img style={imgStyle} className="img-circle" src="icons/renovation.png" />
				</a>
				<h2>{this.props.data.name}</h2>
				<p>Phone: {this.props.data.phone}</p>
				<p>Address: {this.props.data.address}</p>
			</div>
		);
	}
});

module.exports = SubcontractorElement;