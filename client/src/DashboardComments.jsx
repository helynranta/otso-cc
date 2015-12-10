var React = require('react'),
	_ = require('underscore'),
	dateFormat = require('dateformat');

var DashboardComments = React.createClass({
	render: function() {
		let content = [],
			data = this.props.data,
			len = data.length >= 5 ? 5 : data.length,
			thead = (
				<tr className="show-grid header-grid">
					<th xs={3} md={3}>Date</th>
					<th xs={3} md={3}>Subcontractor</th>
					<th xs={3} md={3}>Comment</th>
				</tr>
			);

		data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		for (var i = 0; i < len; i++) {
			content.push(
				<tr className="table table-striped table-hover">
					<td xs={3} md={3} data-title="Date">{dateFormat(new Date(data[i].date), 'dd.mm hh:mm')}</td>
					<td xs={3} md={3} data-title="Subcontractor">{data[i].sc_id}</td>
					<td xs={3} md={3} data-title="Comment">{data[i].comment}</td>
				</tr>
			);
		}
		
		return (
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div className="text-center">
					<h4>Newest comments</h4>
				</div>
				<div className="table-responsive-vertical">
                    <table className="table table-striped table-hover table-orders">
                    	<thead>
                    		{thead}
                    	</thead>
                    	<tbody>
                    		{content}
                    	</tbody>
                    </table>
                </div>
			</div>
		);
	}
});

module.exports = DashboardComments;