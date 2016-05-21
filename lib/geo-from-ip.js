'use strict';

// get node packages
var mmdbreader = require('maxmind-db-reader'),
  mirror = require('./mirroring');

// pull latest
mirror.upgrade();

// read relative db using openSync
var city = mmdbreader.openSync(__dirname + '/../mmdb/GeoLite2-City.mmdb');

// get geo using each ip
exports.allData = function(ip) {

  // result sample
  let result = {
      code: {}
    },
    geodata = city.getGeoDataSync(ip);

  // consolidate data
  if (geodata) {
    if (geodata.city) {
      result.city = geodata.city.names.en;
    } else {
      result.city = null;
    }

    if (geodata.subdivisions) {
      result.state = geodata.subdivisions[0].names.en;
      result.code.state = geodata.subdivisions[0].iso_code;
    } else {
      result.state = null;
      result.code.state = null;
    }

    if (geodata.country) {
      result.country = geodata.country.names.en;
      result.code.country = geodata.country.iso_code;
    }

    if (geodata.continent) {
      result.continent = geodata.continent.names.en;
      result.code.continent = geodata.continent.code;
    }
		
    if (geodata.postal) {
      result.postal = geodata.postal.code;
    }
  } else {
    result.error = 'No data';
    result.ip = ip;
  }

  // return the result
  return result;
};
