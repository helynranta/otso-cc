var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link,
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
			url:'https://otso-cc-lasshi.c9users.io/orders/',
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success: function(data) {
				let orders = _.map(data, (order, id) => {
					order.id = id;
					return order;
				});

				orders = _.sortBy(
					_.filter(orders, (order) => order.mf_id === $this.props.user),
					(order) => -new Date(order.date).getTime());

				let headerRow = (
					<tr className="show-grid header-grid">
						<th xs={3} md={3}>Date</th>
						<th xs={3} md={3}>Subcontractor</th>
						<th xs={3} md={3}>Customer name</th>
						<th xs={3} md={3}>Address</th>
						<th xs={3} md={3}>Comment</th>
					</tr>
				),
					content = _.filter(orders, (order) => order.complete === 0).map((order) => {
						return (
							<tr className="table table-striped table-hover">
								<td xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yy hh:mm")}</td>
								<td xs={3} md={3}><a href={'#subcontractor/' + order.sc_id}>{order.sc_id}</a></td>
								<td xs={3} md={3}>{order.name}</td>
								<td xs={3} md={3}>{order.address}</td>
								<td xs={3} md={3}>{order.add_info}</td>
							</tr>
						);
					});

				content.push(
					_.filter(orders, (order) => order.complete === 1).map((order) => {
						return (
							<tr className="table table-striped table-hover row-complete">
								<td xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yy hh:mm")}</td>
								<td xs={3} md={3}><a href={'#subcontractor/' + order.sc_id}>{order.sc_id}</a></td>
								<td xs={3} md={3}>{order.name}</td>
								<td xs={3} md={3}>{order.address}</td>
								<td xs={3} md={3}>{order.add_info}</td>
							</tr>
						);
					})
				);


				React.render(

                    <div className="bs-component">
                        <div className="page-header">
                            <h2 className="header-orders">Orders</h2>
                        </div>
                        <table className="table table-striped table-hover table-orders">
                            <thead>
                                {headerRow}
                            </thead>
                            <tbody>
                                {content}
                            </tbody>
                        </table>
                        <BackToDashboardButton />

                    </div>,

                    document.getElementById('container')
                );
			}
		});
	}
});

module.exports = OrderListScreen;
