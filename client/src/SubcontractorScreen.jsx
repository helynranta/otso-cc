var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button;

var SubcontractorPage = require('./SubcontractorPage.jsx');

var SubcontractorScreen = React.createClass({
	mixins: [Router.State],
	handleClickBack: function() {
		window._router.transitionTo('subcontractors');
	},
	render: function() {
		this.param = this.getParams().id;

		return (
			<div className="bs-component">
				<SubcontractorPage user={this.props.user} id={this.param} />
			</div>
		);
	}
});

module.exports = SubcontractorScreen;
