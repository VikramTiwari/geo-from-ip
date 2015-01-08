var mmdbreader = require('maxmind-db-reader');

// get databases files from http://dev.maxmind.com/geoip/geoip2/geolite2/ and rename them to city and country respectively

// city database
mmdbreader.open('./city.mmdb', function(err, cities) {
    cities.getGeoData('128.101.101.101', function(err, geodata) {
        var result = {
            city: geodata.city.names.en,
            country: geodata.country.names.en
        }
        console.log(result);
    });
});
