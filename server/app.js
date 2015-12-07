var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');

var port = process.env.PORT || 3000;

app.post('/postFeedback', function(req, res) {
    fs.readFile(__dirname + "/data/feedback.json", 'utf-8', function (err, data) {
        data = JSON.parse(data);
        
        var rand = "";
        while((rand = random.generate(13)) != undefined) {}
        data[rand] = {
            "email": "example@test.com",
            "date": new Date().toJSON(),
            "stars": [1,2,1,2],
            "comment":"kaikki oli paskaa paitsi kusi",
            "recall":false
        }
    });
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
