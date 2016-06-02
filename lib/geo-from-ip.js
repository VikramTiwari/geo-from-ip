'use strict';

// get node packages
let path = require('path');
let mmdbreader = require('maxmind-db-reader');
let city = mmdbreader.openSync(path.resolve(path.join(__dirname, '/../mmdb/GeoLite2-City.mmdb')));

/**
 * get all data about an IP
 * @param  {String} ip ip address
 * @return {Object}    result object containing all the data
 */
function allData (ip) {
  // get all data for ip
  let geodata = city.getGeoDataSync(ip);
  let result = {
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
    // location
    if (geodata.location) {
      result.location = geodata.location;
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
