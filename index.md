# geo-from-ip

Get geolocation 🌐 information about an IP 📲

[![Build Status](https://travis-ci.org/VikramTiwari/geo-from-ip.svg?branch=master)](https://travis-ci.org/VikramTiwari/geo-from-ip) [![NPM Version](https://img.shields.io/npm/v/geo-from-ip.svg)](https://www.npmjs.com/package/geo-from-ip) [![NPM Download](https://img.shields.io/npm/dm/geo-from-ip.svg)](https://www.npmjs.com/package/geo-from-ip)

## Features

- No frills install 🚀
- Downloads databases automatically during installation 🔋
- Run `npm install` to upgrade databases == automatic update on deployments 💎

## How to use

- Include package in your project

``` sh
npm install --save geo-from-ip
# or, if you are using yarn
yarn add geo-from-ip --save
```

- Use package to get geo data from IP

``` javascript
const geoip = require('geo-from-ip')
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

- Update database

Database will get automatically updated every time deployment happens. But if you would like to force an update, just run:

``` sh
npm install
# or, if you are using yarn
yarn
```

## Debugging / Developing

Run your code using `geo-from-ip` as debug flag. Look into `pacakge.json` for example.

## Credits

### Developer: [ 👨‍💻 Vikram Tiwari](https://vikramtiwari.com)

If you found this library helpful, or learned something from it and want to thank me, consider [buying me a cup of ☕️.](https://www.paypal.me/vikramtiwari/5)

### Database: Max-Mind

This product includes GeoLite2 data created by MaxMind, available from <https://www.maxmind.com>
