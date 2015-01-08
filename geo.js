var mmdbreader = require('maxmind-db-reader'),
    fs = require('fs');

// read file for IPs
function getIP(filename) {
    fs.readFile('ips.csv', 'utf-8', function(err, data) {
        if (err) throw err;
        ips = data.split(',');
        ips.forEach(getGeo)
    });
}

function getGeo(ip, index, array) {
    // get geodata
    var city = mmdbreader.openSync('./city.mmdb');
    var geodata = city.getGeoDataSync(ip);
    // form output
    var city = 'NA',
        country = 'NA';

    // consolidate data
    if (geodata) {
        if (geodata.city) {
            country = geodata.country.names.en;
            city = geodata.city.names.en;
        } else if (geodata.country) {
            country = geodata.country.names.en;
        }
    }

    console.log(city, country)
}

getIP('ips.csv');
