var React = require('react');

var SubcontractorElement = React.createClass({
	render: function() {
		let imgStyle = {
			width: '140px',
			height: '140px'
		};

		let stars = this.props.data.reviews > 0 ? 
			<div className="inline avg-stars">{this.props.data.avgstars}<img className="icon-star" src="icons/star.svg" /></div>
		:
			<div className="inline avg-stars no-reviews">no reviews</div>;	

		return (
			<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
				<a href={`#/subcontractor/${this.props.data.id}`}>
					<img style={imgStyle} className="img-circle" src="icons/04.jpg" />
				</a>
				<div>
					<h2 className="inline">{this.props.data.name}</h2>
					{stars}
				</div>
				<p>Phone: <a href={"tel:" + this.props.data.phone}>{this.props.data.phone}</a></p>
				<p>Address: {this.props.data.address}</p>
			</div>
		);
	}
});

module.exports = SubcontractorElement;