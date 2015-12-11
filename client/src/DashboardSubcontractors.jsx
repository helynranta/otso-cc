var React = require('react'),
	_ = require('underscore');

var DashboardSubcontractors = React.createClass({
	render: function() {

		let content = [],
			data = this.props.data,
			len = data.length >= 5 ? 5 : data.length,
			thead = (
				<tr className="show-grid header-grid">
					<th xs={3} md={3}>Subcontractor</th>
					<th xs={3} md={3}>Rating</th>
				</tr>
			);

		data.sort((a, b) => {
			let diff = parseFloat(b) - parseFloat(a);
			return diff < 0 ? -1 : 1;
		});

		for (var i = 0; i < len; i++) {
			content.push(
				<tr className="table table-striped table-hover">
					<td xs={3} md={3} data-title="Subcontractor"><a href={`#/subcontractor/${data[i].sc_id}`}>{data[i].sc_id}</a></td>
					<td xs={3} md={3} data-title="Rating">{data[i].avgstars}</td>
				</tr>
			);
		}

		return (
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<div className="text-center">
					<h4><img className="icon-star" src="icons/star.svg" /> Best rated subcontractors </h4>
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

module.exports = DashboardSubcontractors;