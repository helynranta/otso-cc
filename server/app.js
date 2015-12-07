var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/htdocs/"));

app.get('/postFeedback', function(req, res) {
    console.log("got post");
    
    fs.readFile(__dirname + "/data/feedback.json", function (err, data) {
        try {
             data = JSON.parse(data);
        } catch (err) {
            console.log(err)
        } finally {
            var rand = "";
            while((rand = random.generate(13)) != undefined) {}
            data[rand] = {
                "email": "example@test.com",
                "date": new Date().toJSON(),
                "stars": [1,2,1,2],
                "comment":"kaikki oli paskaa paitsi kusi",
                "recall":false
            }   
        }
        res.end("lol");
    });
});

app.get('/', function(req, res) {
    
})

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
