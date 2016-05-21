'use strict';

// get node packages
var mmdbreader = require('maxmind-db-reader'),
  city = mmdbreader.openSync(__dirname + '/../mmdb/GeoLite2-City.mmdb');

// get geo for an IP
function allData(ip) {

  // get all data for ip
  let geodata = city.getGeoDataSync(ip),
    result = {
      code: {}
    };

  // consolidate data based on type
  if (geodata) {
    // city
    if (geodata.city) {
      result.city = geodata.city.names.en;
    } else {
      result.city = null;
    }
    // state
    if (geodata.subdivisions) {
      result.state = geodata.subdivisions[0].names.en;
      result.code.state = geodata.subdivisions[0].iso_code;
    } else {
      result.state = null;
      result.code.state = null;
    }
    // country
    if (geodata.country) {
      result.country = geodata.country.names.en;
      result.code.country = geodata.country.iso_code;
    }
    // continent
    if (geodata.continent) {
      result.continent = geodata.continent.names.en;
      result.code.continent = geodata.continent.code;
    }
    // postal
    if (geodata.postal) {
      result.postal = geodata.postal.code;
    }
  } else {
    // error
    result.error = 'NA';
    result.ip = ip;
  }

  // return result
  return result;
}

module.exports.allData = allData;
