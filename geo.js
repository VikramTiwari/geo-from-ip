var mmdbreader = require('maxmind-db-reader');

//  open database
var city = mmdbreader.openSync('./city.mmdb');

// get geodata
var geodata = city.getGeoDataSync('182.71.185.139');

// form output
var city = '',
    country = '';

// consolidate data
if (geodata.cities == undefined || typeof geodata.cities === undefined) {
    city = 'NA'
} else {
    city = geodata.cities.names.en;
}

if (geodata.country == undefined || typeof geodata.country === undefined) {
    country = 'NA'
} else {
    country = geodata.country.names.en;
}

// output
console.log(city, country);
