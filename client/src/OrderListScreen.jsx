var React = require('react'),
  Router = require('react-router');

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

var OrderListScreen = React.createClass({
	render: function() {
		return (
			<BackToDashboardButton />
		);
	},
	componentDidMount: function() {
		$.ajax({
			url:'/order.json/*',
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success: function(data) {
				console.log(data);
			}
		});
	}
});

module.exports = OrderListScreen;