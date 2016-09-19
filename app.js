let express = require('express'),
http = require('http'),
fs = require('fs'),
app = express(),
router = require('./router');
let postData ='';
app.set('port', 8888);

app.use(function(req, res) {
    console.log("Request string: " + req.url);
    if(req.url === "/form" || req.url === "/") {
        router.match(req, res, req.url, postData);
    }
});
app.listen(app.get('port'));
/*
app.get('/', function(req, res) {
    console.log("Request: "+ req);

    if(req === "/users") {
       res.send("User Success!");
   }
    else if(req === "/function") {
        res.send("Fucntion Success!");
    }
    else {
        res.send("Some Success!");
    }
});
*/