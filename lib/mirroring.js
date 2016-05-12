#!/usr/bin/env node

'use strict';

if (process.env.COVERAGE) require('blanket');

var fs = require('fs');
var http = require('http');
var zlib = require('zlib');

var config = require('../mmdb/config');

var httpReqOpts = function() {
	return {
		method: 'HEAD',
		hostname: config.hostName,
		port: config.hostPort,
		headers: {
			'User-Agent': config.userAgent,
		},
		agent: false,
	};
};

var isRemoteNewer = function(dest, httpOpts, done) {

	if (!fs.existsSync(dest)) {
		// console.log(dest + ' does not exist');
		return done(true);
	}

	var stats = fs.statSync(dest);
	if (!stats.isFile()) {
		console.error(dest + ' is not a file');
		fs.unlink(dest, function() {
			console.log(dest + ' deleted');
			return done(true);
		});
	}

	httpOpts.headers['If-Modified-Since'] = stats.mtime.toUTCString();

	var request = http.request(httpOpts, function(res) {
			if (res.statusCode === 304) {
				console.log(dest + ' is up-to-date');
				return done(false);
			}
			if (res.statusCode === 200) {
				return done(true);
			}
			console.log(res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			done(true);
		})
		.on('error', function(e) {
			console.error(e);
			done(false);
		});
	request.end();
};

var download = function(dest, opts, done) {

	var request = http.request(opts, function(res) {
			if (res.statusCode !== 200) {
				console.error('response code ' + res.statusCode + ' not handled!');
				console.error('HEADERS: ' + JSON.stringify(res.headers));
				return;
			}

			var file = fs.createWriteStream(dest + '.tmp');
			res.pipe(zlib.createGunzip()).pipe(file);
			file.on('finish', function() {
				// console.log("wrote to file " + dest + '.tmp');
				file.close(function(err) {
					if (err) throw err;
					// console.log("moved " + dest + '.tmp to ' + dest);
					fs.rename(dest + '.tmp', dest, function(err2) {
						if (err2) throw err2;
						console.log('saved ' + dest);
						done();
					});
				});
			});
		})
		.on('error', function(e) {
			console.error(e);
			fs.unlink(dest, function() {
				// It's unlikely the file exists. In the general case, this
				// callback catches the error and...ignores it.
			});
			if (done) done('err: ' + e.message);
		});

	request.end();
};

var doOne = function(item, done) {

	var opts = new httpReqOpts();
	opts.path = config.urlPath + item.remote;

	var dest = config.dbDir + item.local;

	isRemoteNewer(dest, opts, function(shouldGet) {
		if (!shouldGet) return done();

		console.log('downloading ' + dest);
		opts.method = 'GET';
		download(dest, opts, done);
	});
};

// check each file, in series (poor mans async.eachSeries)
// doOne(config.geoIpDbs.shift(), function iterator() {
// 	if (!config.geoIpDbs.length) return;
// 	doOne(config.geoIpDbs.shift(), iterator);
// });


function upgrade() {
	doOne(config.geoIpDbs.shift(), function iterator() {
		if (!config.geoIpDbs.length) return;
		doOne(config.geoIpDbs.shift(), iterator);
	});
}

module.exports.upgrade = upgrade;
