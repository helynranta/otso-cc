var React = require('react'),
	_ = require('underscore');

var DashboardComments = React.createClass({
	render: function() {
		let content,
			data = this.props.data;

		data.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

		content = data.map((entry) => {
			
		});
		
		return (
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div className="text-center">
					Newest comments
				</div>
			</div>
		);
	}
});

module.exports = DashboardComments;