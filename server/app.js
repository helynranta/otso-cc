var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var accounts, orders, feedback = {}

app.use(express.static(__dirname+"/../client/"));
app.use(bodyParser.json({type: 'application/json'}));
// get from rest
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
// put in rest, THIS ONLY TAKES RAW type=application/json
app.post('/:filename/:field', function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var fn = req.params.filename;
    var field = req.params.field;
    // response body
    var result = [{}];
    result["success"] = true;
    // check if file exists
    if(!fs.existsSync(__dirname+"/data/"+fn)) {
        result["success"] = false;
        result["reason"] = "file does not exist";
        result["path"] = __dirname+"/data/"+fn;
        res.end(JSON.stringify(result));
    } else {
        // get model for this type
        var model = require("./data/model/"+fn);
        // read the original file
        fs.readFile(__dirname+"/data/"+fn, 'utf-8', function(err, data) {
            if(err) res.send(err);
            try{
                var data = JSON.parse(data);
            } catch (err){
                res.send("problems officer (JSON)");
            }finally {
                // copy all sent attributes to model
                for(var attr in model) {
                    model[attr] = req.body[attr] // put input data here
                }
                var id = model.id;
                delete model.id;
                data[id] = model;
                //write new data
                fs.writeFile(__dirname+"/data/"+fn, JSON.stringify(data, null, 4));
                res.end(JSON.stringify(result));
            }
        });
    }
});

app.post('/login', function(req, res) {
    var result = {
        "success":"true"
    }
    console.log(req.body);
    res.end(JSON.stringify(result));
});
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
