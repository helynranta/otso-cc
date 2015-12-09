var React = require('react'),
    Button = require('react-bootstrap').Button;

var BackToDashboardButton = require('./BackToDashboardButton.jsx');

function randomString(length) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

var CreateOrder = React.createClass({
    handleSubmit : function () {
        let $this = this;

        var order = {
            id : randomString(32),
            mf_id : $this.props.user,
            sc_id : $('#sub').val(),
            date : new Date().toJSON(),
            name : $('#order-name').val(),
            address : $('#order-address').val(),
            email : $('#order-email').val(),
            add_info : $('#order-add').val()
        };

        if(order['address'].length > 0 && order['name'].length > 0 && order['email'].length > 0) {
            $.ajax({
    			url:'/order.json/*',
    			contentType:'application/json',
    			dataType:'json',
    			type:'POST',
    			data: JSON.stringify(order),
    			success: function(data) {
                    console.log(data)
                    window._router.transitionTo('manufacturer_dashboard');
    			},
    			error:function(xhr, status, err) {
    				console.log($this.props.url, status, err.toString());
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
                },
                error:function(xhr, status, err) {
                    console.log($this.props.url, status, err.toString());
                }
            });
        }
    },
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
                <div className="bs-component">
                    <h1>CreateOrder</h1>
                    <form className="bs-component">
                        <br />
                        <div className="form-group">
                            <label for="sub" className="control-label">Select subcontractor from list</label>
                            <select className="form-control" id="sub">
                                {list.map(createList)}
                            </select>
                            <span className="material-input"></span>
                        </div>
                        <p>Customer information</p>
                        <div className="form-group label-floating">
                            <label className="control-label" for="order-name">Customer name</label>
                            <input id="order-name" className="form-control" size="30"></input>
                            <span className="material-input"></span>
                        </div>
                        <div className="form-group label-floating">
                            <label className="control-label" for="order-address">Customer address</label>
                            <input id="order-address" className="form-control" size="30"></input>
                            <span className="material-input"></span>
                        </div>
                        <div className="form-group label-floating">
                            <label className="control-label" for="order-email">Customer email</label>
                            <input id="order-email" className="form-control" size="30"></input>
                            <span className="material-input"></span>
                        </div>
                        <div className="form-group label-floating">
                            <label className="control-label" for="order-add">Additional information</label>
                            <textarea className="form-control" id="order-add" rows="3" cols="50"></textarea>
                            <span className="material-input"></span>
                        </div>
                        <Button onClick={$this.handleSubmit}>Add</Button>
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
