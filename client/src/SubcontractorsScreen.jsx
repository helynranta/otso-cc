var React = require('react'),
	_ = require('underscore');

var SubcontractorElement = require('./SubcontractorElement.jsx');

var SubcontractorsScreen = React.createClass({
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
					_.each(data, (subcontractor, id) => {
						subcontractor.id = id;
						subcontractors.push(<SubcontractorElement data={subcontractor} key={id} />);
					});

					subcontractors = <div>{subcontractors}</div>;
					React.render(subcontractors, document.getElementById('container'));
				}
			}
		});
	}
});

module.exports = SubcontractorsScreen;