var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var account = require('./data/account');

// jade used for generating feedback site
app.set('views', __dirname+'/views');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname+"/../client/"));
app.use(bodyParser.json({type: 'application/json'}));
// generate feedback form!
app.get('/feedback/:id', function(req, res) {
    res.render('feedback.jade', {});
});
app.get('/genorder', function(req, res) {
    res.render('gen-order.jade', {
        id:random.generate(),
        sc:"lol"});
});
// get from rest
app.get('/:filename/:field', function(req, res) {
    var source = {};
    var fn = req.params.filename;
    var field = req.params.field;
    var data = require('./data/'+fn);

    source = data;
    if(field === "*") res.send(source);
    else res.send(source[field]);

    res.end();
});
// put in rest, THIS ONLY TAKES RAW type=application/json
app.post('/:filename/:field', function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var fn = req.params.filename;
    var field = req.params.field;
    // response body
    var result = {};
    result["success"] = true;
    // check if file exists
    var data = require('./data/'+fn);
    if(data != undefined) {
        var model = require('./data/model/'+fn);
        for(var attr in model) {
            model[attr] = req.body[attr];
        }
        var id = req.body['id'];
        delete model.id;
        data[id] = model;
        fs.writeFileSync('./data/'+fn, JSON.stringify(data, null, 4));
    } else {
        result['success'] = false;
    }
    res.end(JSON.stringify(result));
});

app.post('/login', function(req, res) {
    var result = {
        "success":"true",
        "comment":"",
    }
    if(req.body.user != undefined && req.body.pass != undefined) {
        if(account[req.body.user] == undefined) {
            result.success = "false";
            result.comment = "username or passoword wrong";
        } else {
            if(account[req.body.user].password != req.body.pass) {
                result.success = "false";
                result.comment = "username or passoword wrong";
            } else {
                result.userinfo = account[req.body.user]
            }
        }
    } else {
        result.success = "false"
    }
    console.log(result);
    res.end(JSON.stringify(result));
});
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
