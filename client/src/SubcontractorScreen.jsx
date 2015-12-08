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
			<div>
				<SubcontractorPage id={this.param} />
				<Button bsStyle="primary" onClick={this.handleClickBack}>Back</Button>
			</div>
		);
	}
});

module.exports = SubcontractorScreen;