var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	dateFormat = require('dateformat'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button;

	require('../src/css/style.css');

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
			stars = {},
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
		ajaxes[2] = Promise.resolve($.ajax({
			url: `/subcontractors/rating/*`,
			contentType:'application/json',
			dataType:'json',
			type:'GET'
		})).then((data) => {
			stars = {
				avgstars : "no reviews",
				reviews : 0
			}
			for(var i in data) {
				if(data[i]['sc_id'] == $this.props.id)
				{
					stars.avgstars = data[i].avgstars;
					stars.reviews = data[i].reviews;
				}
			}
			//sc_data.avgstar = data[$this.propse]
		});
		promise = Promise.all(ajaxes).then(() => {
			let content = [
					<div className="header-subcontractor">
						<div id="stars" className="stars">
							{stars.avgstars} ({stars.reviews})
						<img src="icons/star.svg" />
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

			let comments = _.map(fb_data, (comment, id) => {
				comment.id = id;
				return comment;
			});

			//filter here

			_.each(comments, (comment) => {
				content.push(
					<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
						<p>
							<span>{dateFormat(new Date(comment.date), "dd.mm.yyyy")}:</span> <span>{comment.comment}</span>
						</p>
					</div>
				);
			});

			React.render(<div className="bs-component">{content}</div>, document.getElementById('subcontractor'));
		});
	}
});

module.exports = SubcontractorPage;
