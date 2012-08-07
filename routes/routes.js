var http = require('http');
var Sink = require('pipette').Sink;
var fs = require('fs');
var async = require('async');
var querystring = require('querystring');


function request(params, callback) {
	http.request(params, function(response) {
		if (response.statusCode !== 200)
			return callback("error "+response.statusCode);

		(new Sink(response)).on("data", function(data) {
			try {
				data = JSON.parse(data);
				callback(undefined, data);
			} catch (E) {
				return callback(E);
			}

		}).on("error", function(error) {
			callback(error || true);
		})
	}).end();
}

function getPhotos(callback){
	
	request({
		host: 'api.flickr.com',
		path: '/services/rest/?' + querystring.stringify({
			method: 'flickr.photos.search',
			api_key: '1e077032f0f0505d42581499991a1854',
			user_id: '67414351@N04',
			format: 'json',
			nojsoncallback: 1
		})
	}, function(err, data) {
		if (err)
			return callback(err);

		async.map(data["photos"]["photo"], function(photo, callback) {
			request({
				host: 'api.flickr.com',
				path: '/services/rest/?' + querystring.stringify({
					method: 'flickr.photos.getSizes',
					api_key: '1e077032f0f0505d42581499991a1854',
					photo_id: photo.id, 
					format: 'json',
					nojsoncallback: 1
				})
			}, function(err, sizes){
				
				if (err)
					return callback(err);
					
				var larges = sizes["sizes"]["size"].filter(function(size) {
					return size.label === "Large";
				})

				if (larges.length === 0)
					return callback("no large photos");
				
				return callback(undefined, { url: larges[0].source, id: photo.id });
							
			})
		}, callback)
	})
	
}


exports.index = function (req, res) {
	res.render("index", {
					title:"Catherine Tan",
				}, function (err, rendered) {
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(rendered);
					})
					}
exports.projects = function (req, res) {
	res.render("projects", {
					title:"Catherine Tan",
				}, function (err, rendered) {
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(rendered);
					})
					}
					
					
exports.threesixty = function(req, res){
	getPhotos(function(err, photos) {
	if (err)
		return console.log("Error: "+err);

	console.log("Got photos: ");
	photos.forEach(function(photo) {
		console.log(photo);
	})
	res.render("threesixty", {
		title:"Catherine Tan",
		photos :  photos
		}, function (err, rendered) {
			res.writeHead(200, {'Content-Type':'text/html'});
			res.end(rendered);
			})
	})
	}						
				
				
			
					
					
		

		
		
	
	
