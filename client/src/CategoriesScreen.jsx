var React = require('react');

var SubcontractorElement = require('./SubcontractorElement.jsx');

var CategoriesScreen = React.createClass({
	render: function() {
		let subcontractors = [];
		for (var i = 0; i < 6; i++) {
			subcontractors.push(<SubcontractorElement />)
		}

		return (
			<div>
				<h1>Categories</h1>
				{subcontractors}
			</div>
		);
	}
});

module.exports = CategoriesScreen;