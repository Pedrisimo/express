"use strict";
let fs = require('fs'),
    qs = require('querystring'),
    config = require('../config'),
    db = require('../dbconnect'),
    getDBRecs =db.getDBRecs,
    setDBRecs = db.setDBRecs,
    rmDBRecs = db.rmDBRecs;

exports.getAction = function (request, response) {
    getDBRecs((error, data) => {
        let responseData;
        if (error) {
            responseData = error.name + " : " + error.message;
            response.writeHead(503, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({responseData: 'Can\'t get data. Please see server\'s console output for details.'}));
        }
        else {
            responseData = JSON.stringify(data);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(responseData);
            response.end();
        }

    });
};

exports.postAction = function (request, response, pathname, postData) {
    postData = qs.parse(postData);
    setDBRecs(postData, function(error, data) {
        let responseData;
        if (error) {
            responseData = error.name + " : " + error.message;
            response.writeHead(503, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({responseData: 'Can\'t save data. Please see server\'s console output for details.'}));
        }
        else {
            responseData = JSON.stringify(data);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(postData));
        }
    });
};

exports.deleteAllAction = function (request, response, pathname) {
    let deleteData = qs.parse(request.url.trim().replace(/.*\?/, ''));
    rmDBRecs(deleteData, function(error, data) {
            let responseData;
        if (error) {
            responseData = error.name + " : " + error.message;
            response.writeHead(503, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({responseData: 'Can\'t delete record. Please see server\'s console output for details.'}));
        }
        else {
            responseData = JSON.stringify(data);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(deleteData));
        }
    });
};
