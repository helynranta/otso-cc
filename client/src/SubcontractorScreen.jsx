var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button;

var SubcontractorPage = require('./SubcontractorPage.jsx');

var SubcontractorScreen = React.createClass({
	mixins: [Router.State],
	handleClickBack: function() {
		this.transitionTo('subcontractors');
	},
	render: function() {
		this.param = this.getParams().id;

		return (
			<div className="bs-component">
				<SubcontractorPage user={this.props.user} id={this.param} />
				{this.props.group === 0 ? <Button className="btn btn-raised btn-warning" id="back-button" onClick={this.handleClickBack}>Back</Button> : ''}
			</div>
		);
	}
});

module.exports = SubcontractorScreen;
