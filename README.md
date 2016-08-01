# geo-from-ip

Get geolocation information about an IP using MaxMind's GeoLite2 databases.

[![Build Status](https://travis-ci.org/VikramTiwari/geo-from-ip.svg?branch=master)](https://travis-ci.org/VikramTiwari/geo-from-ip) [![NPM Version](https://img.shields.io/npm/v/geo-from-ip.svg)](https://www.npmjs.com/package/geo-from-ip) [![NPM Download](https://img.shields.io/npm/dm/geo-from-ip.svg)](https://www.npmjs.com/package/geo-from-ip)

## Features

- No frills install
- Downloads databases automatically during installation
- Run `npm install` to upgrade databases == automatic update on deployments

## How to use

- Include package in your project

```bash
npm install --save geo-from-ip
```

- Use package to get geo data from IP

```javascript
let geoip = require('geo-from-ip')
console.log(geoip.allData('199.188.195.120'))

/*
{ code: { state: 'CA', country: 'US', continent: 'NA' },
  city: 'San Francisco',
  state: 'California',
  country: 'United States',
  continent: 'North America',
  postal: '94103',
  location:
   { accuracy_radius: 10,
     latitude: 37.7758,
     longitude: -122.4128,
     metro_code: 807,
     time_zone: 'America/Los_Angeles' } }
 */
```

### Max-Mind License

This product includes GeoLite2 data created by MaxMind, available from <https://www.maxmind.com>
