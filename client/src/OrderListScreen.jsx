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
						<Row className="show-grid">
							<Col xs={3} md={3}>{dateFormat(new Date(order.date), "dd.mm.yyyy")}</Col>
							<Col xs={3} md={3}>{order.name}</Col>
							<Col xs={3} md={3}>{order.address}</Col>
							<Col xs={3} md={3}>{order.add_info}</Col>
						</Row>
					);
				}),
				headerRow = (
					<Row className="show-grid header-grid">
						<Col xs={3} md={3}>Date</Col>
						<Col xs={3} md={3}>Customer name</Col>
						<Col xs={3} md={3}>Address</Col>
						<Col xs={3} md={3}>Comment</Col>
					</Row>
				);

				React.render(<div><Grid>{headerRow}{content}</Grid><BackToDashboardButton /></div>, document.getElementById('container'));
			}
		});
	}
});

module.exports = OrderListScreen;