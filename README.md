# geo-from-ip

[![Build Status](https://travis-ci.org/VikramTiwari/geo-from-ip.svg?branch=master)](https://travis-ci.org/VikramTiwari/geo-from-ip)

Get geolocation information about an IP using MaxMind's GeoLite2 databases.

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
let geoip = require('./lib/geo-from-ip');
var ip = '199.188.195.120';
console.log(geoip.allData(ip));
// { code: { state: 'CA', country: 'US', continent: 'NA' },
//   city: 'San Francisco',
//   state: 'California',
//   country: 'United States',
//   continent: 'North America',
//   postal: '94103' }
```

### Max-Mind License

This product includes GeoLite2 data created by MaxMind, available from <https://www.maxmind.com>
