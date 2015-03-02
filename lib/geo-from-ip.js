// get node packages
var mmdbreader = require('maxmind-db-reader');

// get geo using each ip
exports.allData = function(ip) {

    // result sample
    var result = {
        city: 'NA',
        country: 'NA',
        isp: 'NA',
        org: 'NA'
    };

    // read relative db using openSync
    var city = mmdbreader.openSync('./mmdb/GeoIP2-City.mmdb');
    var isp = mmdbreader.openSync('./mmdb/GeoIP2-ISP.mmdb');

    // query for data from ip
    var geodata = city.getGeoDataSync(ip);
    var ispdata = isp.getGeoDataSync(ip);

    // consolidate data
    if (geodata) {
        if (geodata.city) {
            result['city'] = geodata.city.names.en;
        }
        if (geodata.country) {
            result['country'] = geodata.country.names.en;
        }
    }

    if (ispdata) {
        if (ispdata.isp) {
            result['isp'] = ispdata.isp;
        }
        if (ispdata.organization) {
            result['org'] = ispdata.organization;
        }
    }

    // return the result
    return result;
}
