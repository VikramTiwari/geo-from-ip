var mmdbreader = require('maxmind-db-reader');

//  open database
var city = mmdbreader.openSync('./city.mmdb');

// get geodata
var geodata = city.getGeoDataSync('128.101.101.101');

// form output
var result = {
    'City': geodata.city.names.en,
    'Country': geodata.country.names.en
}

// output
console.log(result);