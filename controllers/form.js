"use strict";
let fs = require('fs'),
    config = require('../routesconfig');

exports.getForm = function(req, res) {
    res.set("Content-Type", 'text/html');
    fs.createReadStream(config.folders.publicFolder + '/form.html').pipe(res);
};
