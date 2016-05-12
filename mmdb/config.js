'use strict';

// where your GeoIP databases are stored
exports.dbDir = __dirname + '/../mmdb/';

// the download site to fetch them from
exports.hostName = 'geolite.maxmind.com';
exports.hostPort = 80;
exports.urlPath = '/download/geoip/database/';
exports.userAgent = 'MaxMind-geolite-mirror-simple/0.0.3';

//local-filename, geolite-name
exports.geoIpDbs = [{
	local: 'GeoLite2-City.mmdb',
	remote: 'GeoLite2-City.mmdb.gz'
}, {
	local: 'GeoLite2-Country.mmdb',
	remote: 'GeoLite2-Country.mmdb.gz'
}, ];
