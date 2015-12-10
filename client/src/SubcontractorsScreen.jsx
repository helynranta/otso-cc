var React = require('react'),
	_ = require('underscore');

var SubcontractorElement = require('./SubcontractorElement.jsx'),
	BackToDashboardButton = require('./BackToDashboardButton.jsx');

var SubcontractorsScreen = React.createClass({
	render: function() {
		return (
			<div id="container" className="container-subcontractor"></div>
		);
	},
	componentDidMount: function() {
		let $this = this,
			subcontractors = [],
			ajaxes = [],
			sc_data,
			stars_data;

		ajaxes[0] = Promise.resolve($.ajax({
				url:'https://otso-cc-lasshi.c9users.io/subcontractor.json/*',
				contentType:'application/json',
				dataType:'json',
				type:'GET',
			})
		).then((data) => {
			sc_data = data;
		});

		ajaxes[1] = Promise.resolve($.ajax({
				url:'https://otso-cc-lasshi.c9users.io/subcontractors/rating/*',
				contentType:'application/json',
				dataType:'json',
				type:'GET',
			})
		).then((data) => {
			stars_data = data;
		});

		Promise.all(ajaxes).then(() => {
			sc_data = _.map(sc_data, (subcontractor, id) => {
				subcontractor.id = id;
				let stars = _.find(stars_data, (entry) => entry.sc_id === subcontractor.id) || {};
				subcontractor.avgstars = stars.avgstars || 0;
				subcontractor.reviews = stars.reviews || 0;
				return subcontractor;
			});

			sc_data.sort(function(a, b) {
				if (b.avgstars !== a.avgstars) {
					return b.avgstars - a.avgstars;
				} else {
					return b.reviews - a.reviews;
				}
			});

			subcontractors = _.map(sc_data, (subcontractor) => {
				return <SubcontractorElement data={subcontractor} key={subcontractor.id} />;
			});

			subcontractors = (
				<div className="bs-component">
					{subcontractors}
				</div>
			);
			React.render(subcontractors, document.getElementById('container'));
		});
	}
});

module.exports = SubcontractorsScreen;
