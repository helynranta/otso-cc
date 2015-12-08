var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

require('./style.css')

function randomString(length) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

var CreateOrder = React.createClass({
    mixins: [Router.State, Navigation],
    handleSubmit : function (e) {
        e.preventDefault();

        var order = {
            id : randomString(32),
            sc_id : $('#sub').val(),
            date : new Date().toJSON(),
            name : $('#order-name').val(),
            address : $('#order-address').val(),
            add_info : $('#order-add').val()
        };
        console.log(order["address"])
        if(order['address'].length > 0 && order['name'].length > 0) {
            $.ajax({
    			url:'/order.json/*',
    			contentType:'application/json',
    			dataType:'json',
    			type:'POST',
    			data: JSON.stringify(order),
    			success: function(data) {
                    console.log(data)
                    this.transitionTo('subcontractors');
    			}.bind(this),
    			error:function(xhr, status, err) {
    				console.log(this.props.url, status, err.toString());
    			}
            });
        }
    }.bind(this),
    getInitialState : function () {
        return {
            data : []
        }
    },
    componentDidMount : function () {
        $.get('subcontractor.json/*', function(result) {
            var list = []
            for(var s in result) {
                list.push(s);
            }
            this.setState({
                data: list
            });
        }.bind(this))
    },
    render: function() {
        var createList = function( item ) {
            return <option value={item}>{item}</option>
        }
        return (
            <div className="container text-center">
                <h1>CreateOrder</h1>
                <form className="orderForm" onSubmit={this.handleSubmit}>
                    <br />
                    <p>Select subcontractor from list:</p>
                    <select id="sub">
                        {this.state.data.map(createList)}
                    </select>
                    <br />
                    <p>Give customer information</p>
                    <input id="order-name" placeholder="customer name" size="50"></input><br />
                    <input id="order-address" placeholder="customer address" size="50"></input><br />
                    additional information <br/>
                    <textarea id="order-add" rows="5" cols="50"></textarea>
                    <br />
                    <input type="submit" name="save" value="save"></input>
            </form>
        </div>
    );
}
});

module.exports = CreateOrder;
