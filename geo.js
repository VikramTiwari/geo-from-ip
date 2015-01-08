var mmdbreader = require('maxmind-db-reader');

// get databases files from http://dev.maxmind.com/geoip/geoip2/geolite2/ and rename them to city and country respectively

// country database
mmdbreader.open('./country.mmdb',function(err,countries){
    // get geodata
    countries.getGeoData('128.101.101.101',function(err,geodata){
        // log data
        console.log(geodata);
    });
});

// city database
mmdbreader.open('./city.mmdb',function(err,cities){
    // get geodata
    cities.getGeoData('128.101.101.101',function(err,geodata){
        // log data
        console.log(geodata);
    });
});