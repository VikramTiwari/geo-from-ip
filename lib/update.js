'use strict';

let fs = require('fs'),
  zlib = require('zlib'),
  async = require('async'),
  request = require('request');

let config = require('../mmdb/config');

function isRemoteNewer(dest, remote, cb) {
  // if no file
  if (!fs.existsSync(dest)) {
    cb(null, false);
  } else {

    // if dest file is not a file, remove it
    var stats = fs.statSync(dest);
    if (!stats.isFile()) {
      console.error(dest + ' is not a file');
      fs.unlink(dest, function() {
        console.log(dest + ' deleted');
      });
    }

    request({
      url: remote,
      headers: {
        'If-Modified-Since': stats.mtime.toUTCString()
      }
    }, function(res) {
      if (res === null) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    });
  }
}

function download(dest, remote, cb) {
  // console.log(dest, remote);
  request
    .get(remote)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(dest))
    .on('error', function(error) {
      cb(error, false);
    })
    .on('finish', function() {
      cb(null, true);
    });
}

function dl(item, cb) {
  var dest = config.dbDir + item.local;

  isRemoteNewer(dest, item.remote, function(err, newer) {
    if (err) {
      cb(err, false);
    } else if (!err && newer) {
      cb(null, false);
    } else if (!err && !newer) {
      // begin downloading
      console.log('downloading ' + dest);

      download(dest, item.remote, function(err, done) {
        if (err) {
          cb(err, false);
        } else if (!err && !done) {
          cb(null, false);
        } else if (!err && done) {
          cb(null, true);
        }
      });
    }
  });
}

function sync(cb) {
  async.eachSeries(config.geoIpDbs, dl, function(err) {
    cb(err, true);
  });
}

async.eachSeries(config.geoIpDbs, dl, function(err) {
  console.log(err);
});

module.exports.sync = sync;
