'use strict';

var expect = require('chai').expect,
  Chance = require('chance'),
  chance = new Chance(),
  geo = require('../lib/geo-from-ip.js');

describe('Geos', function() {

  var ip = chance.ip();
  var result = geo.allData(ip);

  if (result.error) {
    describe('error()', function() {
      it('should return error message and IP', function() {
        expect(result).to.have.a.property('ip');
        expect(result).to.have.a.property('error');
      });
    });
  } else {

		describe('cityLevel()', function() {
      it('should return city level information', function() {
        expect(result).to.have.a.property('city');
      });
    });

    describe('stateLevel()', function() {
      it('should return state level information', function() {
        expect(result).to.have.a.property('state');
      });
    });

    describe('countryLevel()', function() {
      it('should return country level information', function() {
        expect(result).to.have.a.property('country');
      });
    });

    describe('continentLevel()', function() {
      it('should return continent level information', function() {
        expect(result).to.have.a.property('continent');
      });
    });
  }
});
