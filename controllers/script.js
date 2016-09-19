"use strict";
let fs = require('fs'),
    config = require('../config');

exports.getScript = function(request, response) {
    response.writeHead(200, {"Content-Type": 'text/javascript'});
    fs.createReadStream(config.directories.project + request.url).pipe(response);
};