var React = require('react');

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

function randomString(length) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

var CreateOrder = React.createClass({
    handleSubmit : function (e) {
        e.preventDefault();

        var order = {
            id : randomString(32),
            mf_id : this.props.user,
            sc_id : $('#sub').val(),
            date : new Date().toJSON(),
            name : $('#order-name').val(),
            address : $('#order-address').val(),
            add_info : $('#order-add').val()
        };

        if(order['address'].length > 0 && order['name'].length > 0) {
            $.ajax({
    			url:'/order.json/*',
    			contentType:'application/json',
    			dataType:'json',
    			type:'POST',
    			data: JSON.stringify(order),
    			success: function(data) {
                    console.log(data)
                    window._router.transitionTo('manufacturer_dashboard');
    			}.bind(this),
    			error:function(xhr, status, err) {
    				console.log(this.props.url, status, err.toString());
    			}
            });
            // send data also to email function, need to add email adrress to the order form....?
            $.ajax({
                url:'/sendMail',
                contentType:'application/json',
                dataType:'json',
                type:'POST',
                data: JSON.stringify(order),
                success: function(data) {
                    console.log(data)
                }.bind(this),
                error:function(xhr, status, err) {
                    console.log(this.props.url, status, err.toString());
                }
            });
        }
    }.bind(this),
    componentDidMount : function () {
        let $this = this,
            content;

        var createList = function( item ) {
            return <option value={item}>{item}</option>
        }

        $.get('subcontractor.json/*', function(result) {
            var list = []
            for(var s in result) {
                list.push(s);
            }

            content = (
                <div>
                    <h1>CreateOrder</h1>
                    <form className="orderForm" onSubmit={this.handleSubmit}>
                        <br />
                        <p>Select subcontractor from list:</p>
                        <select id="sub">
                            {list.map(createList)}
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
                    <BackToDashboardButton />
                </div>
            );

            React.render(content, document.getElementById('container'));
        })
    },
    render: function() {
        return (
            <div className="container text-center" id="container"></div>
        );
    }
});

module.exports = CreateOrder;
