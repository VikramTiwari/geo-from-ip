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
    describe('allData()', function() {
      it('should return city level information', function() {
        expect(result).to.have.a.property('city');
      });
      it('should return state level information', function() {
        expect(result).to.have.a.property('state');
      });
      it('should return country level information', function() {
        expect(result).to.have.a.property('country');
      });
      it('should return continent level information', function() {
        expect(result).to.have.a.property('continent');
      });
      it('should return location information', function() {
        expect(result).to.have.a.property('location');
      });
    });
  }
});
