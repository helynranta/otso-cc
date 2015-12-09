var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button;

var SubcontractorPage = require('./SubcontractorPage.jsx');

var SubcontractorScreen = React.createClass({
	mixins: [Router.State, Navigation],
	handleClickBack: function() {
		this.transitionTo('subcontractors');
	},
	render: function() {
		this.param = this.getParams().id;

		return (
			<div className="bs-component">
				<SubcontractorPage id={this.param} />
				<Button className="btn btn-raised btn-warning" onClick={this.handleClickBack}>Back</Button>
			</div>
		);
	}
});

module.exports = SubcontractorScreen;
