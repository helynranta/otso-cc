var React = require('react'),
  Router = require('react-router'),
  _ = require('underscore'),
  Bootstrap = require('react-bootstrap'),
  dateFormat = require('dateformat'),
  Grid = Bootstrap.Grid,
  Row = Bootstrap.Row,
  Col = Bootstrap.Col;

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

var OrderListScreen = React.createClass({
	render: function() {
		return (
			<div id="container"></div>
		);
	},
	componentDidMount: function() {
		let $this = this;

		$.ajax({
			url:'/order.json/*',
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success: function(data) {
				let orders = _.map(data, (order, id) => {
					order.id = id;
					return order;
				});

				orders = _.filter(orders, (order) => order.mf_id === $this.props.user);

				let content = orders.map((order) => {
					return (
						<tr className="table table-striped table-hover">
							<td xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yy hh:mm")}</td>
							<td xs={3} md={3}>{order.name}</td>
							<td xs={3} md={3}>{order.address}</td>
							<td xs={3} md={3}>{order.add_info}</td>
						</tr>
					);
				}),
				headerRow = (
					<tr className="show-grid header-grid">
						<th xs={3} md={3}>Date</th>
						<th xs={3} md={3}>Customer name</th>
						<th xs={3} md={3}>Address</th>
						<th xs={3} md={3}>Comment</th>
					</tr>
				);

				React.render(

                    <div className="bs-component">
                        <div className="page-header">
                            <h2>Orders:</h2>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                {headerRow}
                            </thead>
                            <tbody>
                                {content}
                            </tbody>
                        </table>
                        <BackToDashboardButton />

                    </div>,

                        document.getElementById('container'));
			}
		});
	}
});

module.exports = OrderListScreen;
