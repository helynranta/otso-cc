var React = require('react'),
	_ = require('underscore');

var DashboardSubcontractors = React.createClass({
	render: function() {
		return (
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div className="text-center">
					Best rated subcontractors
				</div>
			</div>
		);
	}
});

module.exports = DashboardSubcontractors;