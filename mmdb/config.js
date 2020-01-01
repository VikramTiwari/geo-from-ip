'use strict'

// where your GeoIP databases are stored
exports.dbDir = __dirname

// local:filename, remote:geolite-url
exports.geoIpDbs = [{
  local: 'GeoLite2-City.mmdb',
  remote: `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${process.env.MAXMIND_LICENSE_KEY}&suffix=tar.gz`
}]