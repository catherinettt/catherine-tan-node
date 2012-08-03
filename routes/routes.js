var http = require('http');
var request = require('request');
var fs = require('fs');

exports.index = function (req, res) {
	res.render("index", {
					title:"Catherine Tan",
				}, function (err, rendered) {
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(rendered);
					})
					}