var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');

var port = process.env.PORT || 3000;

var accounts, orders, feedback = {}

app.use(express.static(__dirname+"/htdocs/"));

app.get('/getFeedback', function(req, res) {
    res.send();
    res.end();
});
app.get('/getOrders', function(req, res) {
    var data = loadOrders();
    res.end(data);
});

app.get('/test', function(req, res) {

})

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);

    loadOrders();
    loadFeedback();
    loadAccounts();
});

// functions
var loadOrders = function () {
    var source = {};
    fs.readFile(__dirname+"/data/order.json", function(err, data) {
        if(err) throw err;
        try{
            var data = JSON.parse(data);
        }catch (err){
            throw err;
        }finally {
            source = data;
        }
        orders = source;
    });
};
var loadFeedback = function () {
    var source = {};
    fs.readFile(__dirname + "/data/feedback.json", function (err, data) {
        if(err) throw err;
        try{
            var data = JSON.parse(data);
        }catch (err){
            throw err;
        }finally {
            source = data;
        }
        feedback = source;
    });
};
var loadAccounts = function() {
    // load all accounts to memory (bubbelcum)
    fs.readFile(__dirname+"/data/accounts.json", function(err, data) {
        if(err) throw err;
        try {
            var data = JSON.parse(data);
        }
        catch(err) {
            throw err;
        } finally {
            accounts = data;
        }
    });
}
