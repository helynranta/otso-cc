var React = require('react'),
	_ = require('underscore');

var SubcontractorElement = require('./SubcontractorElement.jsx');

var CategoriesScreen = React.createClass({
	render: function() {
		return (
			<div id="container"></div>
		);
	},
	componentDidMount: function() {
		let $this = this,
			subcontractors = [];

		$.ajax({
			url:'/subcontractor.json/*',
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success: (data) => {
				try{
					data = JSON.parse(data);
				} catch(err){
					
				} finally {
					_.each(data, (subcontractor) => {
						subcontractors.push(<SubcontractorElement data={subcontractor} />);
					});

					subcontractors = <div>{subcontractors}</div>;
					React.render(subcontractors, document.getElementById('container'));
				}
			}
		});
	}
});

module.exports = CategoriesScreen;