"use strict";
let fs = require('fs'),
    config = require('../routesconfig');

exports.getPublic = function(req, res) {
	let conType = '';
	if(req.url.match(/^.*\.css$/) !== null) {
        conType = 'text/css';
	}
	else if(req.url.match(/^.*\.js/) !== null) {
		conType = 'text/javascript';
	}
	else {
		conType = 'text/html';
	}
    res.set('Content-Type', conType);
    fs.createReadStream(config.folders.app + req.url).pipe(res);
};