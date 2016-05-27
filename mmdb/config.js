'use strict';

// where your GeoIP databases are stored
exports.dbDir = __dirname + '/';

//local-filename, remote geolite-url
exports.geoIpDbs = [{
  local: 'GeoLite2-City.mmdb',
  remote: 'https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz'
}];
