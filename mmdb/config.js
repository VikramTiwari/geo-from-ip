'use strict';

// where your GeoIP databases are stored
exports.dbDir = __dirname + '/';

//local-filename, geolite-name
exports.geoIpDbs = [{
	local: 'GeoLite2-City.mmdb',
	remote: 'https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz'
}, {
	local: 'GeoLite2-Country.mmdb',
	remote: 'https://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.mmdb.gz'
}, ];
