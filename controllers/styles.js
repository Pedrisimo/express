"use strict";
let fs = require('fs'),
    config = require('../config');

exports.getStyles = function(request, response) {
    response.writeHead(200, {"Content-Type": 'text/css'});
    fs.createReadStream(config.directories.project + request.url).pipe(response);
};