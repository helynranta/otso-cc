var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router');

var SubcontractorPage = require('./SubcontractorPage.jsx');

var SubcontractorScreen = React.createClass({
	mixins: [Router.State],
	render: function() {
		this.param = this.getParams().id;

		return (
			<div>
				<div id="content"></div>
			</div>
		);
	},
	componentDidMount: function() {
		let $this = this;

		$.ajax({
			url:`/subcontractor.json/${this.param}`,
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success: (data) => {
				try{
					data = JSON.parse(data);
				} catch(err){
					
				} finally {
					data.id = $this.param;
					React.render(<SubcontractorPage data={data} />, document.getElementById('content'));
				}
			}
		});
	}
});

module.exports = SubcontractorScreen;