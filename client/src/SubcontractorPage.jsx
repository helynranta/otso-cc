var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button;

var SubcontractorPage = React.createClass({
	mixins: [Router.State, Navigation],
	render: function() {
		return (
			<div id="subcontractor">
			</div>
		);
	},
	componentDidMount: function() {
		let $this = this,
			sc_data,
			fb_data,
			ajaxes = [],
			promise;

		ajaxes[0] = Promise.resolve($.ajax({
				url:`/subcontractor.json/${$this.props.id}`,
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			sc_data = data;
			sc_data.id = $this.props.id;
		});

		ajaxes[1] = Promise.resolve($.ajax({
				url:'/feedback.json/*',
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			fb_data = data;
			// filter out own feedback
		});

		promise = Promise.all(ajaxes).then(() => {
			let content = [
					<div className="header-subcontractor">
						<div className="stars">
							4.3 <img src="icons/star.svg" />
						</div>
						<img className="img-circle img-subcontractor" src="icons/renovation.png" />
					</div>,
					<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
						<p>{sc_data.name}</p>
					</div>,
					<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
						<p>Phone: {sc_data.phone}</p>
					</div>,
					<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
						<p>Address: {sc_data.address}</p>
					</div>
			];
		
			_.each(fb_data, (comment, id) => {
				content.push(
					<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
						<p>
							<span>{comment.date}:</span> <span>{comment.comment}</span>
						</p>
					</div>
				);
				console.log(comment);
			});

			React.render(<div>{content}</div>, document.getElementById('subcontractor'));
		});
	}
});

module.exports = SubcontractorPage;