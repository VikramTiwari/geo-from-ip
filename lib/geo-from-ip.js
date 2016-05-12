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
	let result = {},
		geodata = city.getGeoDataSync(ip);

	// consolidate data
	if (geodata) {
		result.city = geodata.city.names.en;
		result.country = geodata.country.names.en;
		result.continent = geodata.continent.names.en;
		result.postal = geodata.postal.code;
		result.code = {
			country: geodata.country.iso_code,
			continent: geodata.continent.code
		};
	}

	// return the result
	return result;
};
