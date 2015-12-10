var express	= require('express');
var app		= express();
var fs      = require("fs");
var random  = require('randomstring');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var _ = require('underscore');
var port = process.env.PORT || 3000;

var account = require('./data/account');

// jade used for generating feedback site
app.set('views', __dirname+'/views');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname+"/../client/"));
app.use(bodyParser.json({type: 'application/json'}));
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// generate feedback form!
app.get('/feedback/:id', function(req, res) {
    // check if there is order to be given feedback to
    var order = JSON.parse(fs.readFileSync(__dirname+('/data/order.json')), 'utf-8');
    if(order[req.params.id] != undefined) {
        // check if this order has been already reviewed
        var feedback = JSON.parse(fs.readFileSync(__dirname+('/data/feedback.json')), 'utf-8');
        if(feedback[req.params.id] != undefined) {
            res.send("this url has been used");
            res.end();
        } else {
            // send form with subcontractor information
            var sc = JSON.parse(fs.readFileSync(__dirname+('/data/subcontractor.json')), 'utf-8');
            res.render('feedback.jade', {
                order : order[req.params.id],
                scs : sc[order[req.params.id]["sc_id"]]
            });
        }
    } else {
        res.send("500");
        res.end();
    }
});
app.get('/genorder', function(req, res) {
    res.render('gen-order.jade', {
        id:random.generate(),
        sc:"lol"});
});

// get all orders with completion data
app.get('/orders', function(req, res) {
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));

    _.each(orderData, function(entry, id) {
        entry.complete = typeof feedBackData[id] === 'undefined' ? 0 : 1;
    });
    
    res.send(orderData);
});

// get all feedback with subcontractor ids
app.get('/feedback', function(req, res) {
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));

    var feedback = [];
    _.each(feedBackData, function(entry, id) {
        if (typeof orderData[id] !== 'undefined') {
            entry.id = id;
            entry.sc_id = orderData[id].sc_id;
            feedback.push(entry);
        }
    });

    res.send(feedback);
});

// get from rest
app.get('/:filename/:field', function(req, res) {
    var source = {};
    var fn = req.params.filename;
    var field = req.params.field;
    var data = JSON.parse(fs.readFileSync('./data/'+fn, 'utf-8'));

    source = data;
    if(field === "*") res.send(source);
    else res.send(source[field] || {});

    res.end();
});

// helper functions for countStars get-function
function checkForMatch(array, propertyToMatch) {
    var matchArray = [];
    for(var i = 0; i < array.length; i++){
        if(array[i][propertyToMatch] == array[i][propertyToMatch]) {
                matchArray.push(array[i][propertyToMatch]);
        }
    }
    return matchArray;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// get subcontractor's feedback
app.get('/subcontractor/feedback/:id', function(req, res) {
    var sc_id = req.params.id;
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));

    var feedback = {};
    _.each(feedBackData, function (entry, id) {
        if (typeof orderData[id] !== 'undefined' && orderData[id].sc_id === sc_id) {
            feedback[id] = entry;
        }
    });

    res.send(feedback);
});

// get subcontractor's orders
app.get('/subcontractor/orders/:id', function(req, res) {
    var sc_id = req.params.id;
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));

    var orders = {};
    _.each(orderData, function(entry, id) {
        if (entry.sc_id === sc_id) {
            entry.complete = typeof feedBackData[id] === 'undefined' ? 0 : 1;
            orders[id] = entry;
        }
    });

    res.send(orders);
});

app.get('/feedback/mail/:mail', function(reg, res) {
    var mail = reg.params.mail;
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));
    var feedBackCounter = 0;
    var orderCounter = 0;

    var object = {
        email: mail,
        feedbacks: 0,
        orders: 0
    }
    _.each(orderData, function (entry, id) {
        if (typeof feedBackData[id] !== 'undefined' && feedBackData[id]["email"] == mail) {
            object.feedbacks += 1;
        }
    });
    _.each(orderData, function (entry, id) {
        if (typeof orderData[id] !== 'undefined' && orderData[id]["email"] == mail) {
            object.orders += 1;
        }
    });

    res.send(object);
});

// get subcontractor statistics from rest
app.get('/subcontractors/rating/:id', function(reg, res) {

    var field = reg.params.id;
    var orderData = JSON.parse(fs.readFileSync("./data/order.json", 'utf-8'));
    var feedBackData = JSON.parse(fs.readFileSync("./data/feedback.json", 'utf-8'));
    var avgstars, ratings, counter = 0;
    var tempArray = [];
    var tempArray2 = [];
    var returnArray = [];

    // combine orders to right feedbacks from .json files
    for(var id in orderData)
    {
        if(feedBackData[id] != undefined) {
            tempArray.push({sc_id: orderData[id].sc_id, avgstars: feedBackData[id].stars});
        }
    }
    // check for matching names and make an array out of unique id's.
    tempArray2 = checkForMatch(tempArray, "sc_id");
    var unique = tempArray2.filter( onlyUnique );

    // make objects out of our id's
    for(var i = 0; i < unique.length; i++)
    {
        returnArray.push({
            sc_id: unique[i],
            avgstars: 0,
            reviews: 0
        });
    }
    // compare original tempArray with id's and feedback statistics to our array of objects with unique subcontractors.
    // combine them to a single array, with all stars and number of reviews under same id
    for(var i = 0; i < tempArray.length; i++) {
        for(var j = 0; j < returnArray.length; j++) {
            if(returnArray[j].sc_id == tempArray[i].sc_id) {
                returnArray[j].reviews += 1;
                returnArray[j].avgstars += (parseInt(tempArray[i].avgstars[0]) + parseInt(tempArray[i].avgstars[1]) + parseInt(tempArray[i].avgstars[2]) + parseInt(tempArray[i].avgstars[3])) / 4;
            }
        }
    }
    // calculate average stars and finalize the array for returning to client. Yay :)
    for(var i = 0; i < returnArray.length; i++) {
        returnArray[i].avgstars /= parseInt(returnArray[i].reviews);
    }
    if(field === "*")
        res.send(returnArray);
    else {
        var sc = _.find(returnArray, function (user) {
            return user.sc_id == field;
        });

        if (typeof sc === 'undefined') {
            sc = {
                sc_id : field,
                avgstars : 0,
                reviews : 0
            };
        }
        res.send(sc);
    }
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
    var data = JSON.parse(fs.readFileSync('./data/'+fn, 'utf-8'));
    if(data != undefined) {
        var model = require('./data/model/'+fn);
        for(var attr in model) {
            model[attr] = req.body[attr];
        }

        var id = req.body['id'];
        delete model.id;
        console.log(data[id])
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
                result.userinfo = account[req.body.user];
                result.userinfo.login = req.body.user;
            }
        }
    } else {
        result.success = "false"
    }
    console.log(result);
    res.end(JSON.stringify(result));
});

// ***** E-mail section *****
// get order id through post and send an email to
// id, name and email as parameter
app.post('/sendMail', function(reg, res) {
    var config = require('./config.js')
    // define a transporter (Whos sending and authentication)
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'paavoapp@gmail.com',
            pass: config.gmail
        }
    });
    // set mailoptions, like sender, receiver, subject, html text etc. etc.
    var mailOptions = {
    from: 'Paavon Sähkö ✔ <PaavoApp@gmail.com>', // sender address
    to: ''+reg.body.name+', '+reg.body.email, // list of receivers
    subject: 'Thanks for ordering from us! ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Greetings! ✔</b><br> Please answer to this feedback form: ' + 'localhost:3000/feedback/'+reg.body.id+'<br>Thanks, Paavon Sähkö' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
    res.end("Success!");
});
/* ***** end of email section ***** */

var server = app.listen(port, process.env.IP, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});
