var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var accounts, orders, feedback = {}

app.use(express.static(__dirname+"/../client/"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({type: 'application/json'}));

app.get('/:filename/:field', function(req, res) {
    var source = {};
    var fn = req.params.filename;
    var field = req.params.field;
    fs.readFile(__dirname+"/data/"+fn, function(err, data) {
        if(err) res.send(err);
        try{
            var data = JSON.parse(data);
        } catch (err){
            res.send("problems officer (JSON)");
        }finally {
            source = data;
            if(field === "*") res.send(source);
            else res.send(source[field]);
            res.end();
        }
    });
});
//THIS ONLY TAKES RAW type=application/json
app.post('/', function(req, res) {
    if (!req.body) return res.sendStatus(400);

    console.log(req.body);
    
    res.end();
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
