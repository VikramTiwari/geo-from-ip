'use strict'

const debug = require('debug')('geo-from-ip:test')
const expect = require('chai').expect
const Chance = require('chance')
const chance = new Chance()
const geo = require('../lib/geo-from-ip.js')

debug('Generating 5 random IPs to run tests upon')

Array(5)
  .fill()
  .map(() => {
    const ip = chance.ip()

    describe('Geos', () => {
      debug(`Running test for ${ip}`)
      let result = geo.allData(ip)

      if (result.error) {
        describe('error()', () => {
          it('should return error message and IP', () => {
            expect(result).to.have.a.property('ip')
            expect(result).to.have.a.property('error')
          })
        })
      } else {
        describe('allData()', () => {
          it('should return city level information', () => {
            expect(result).to.have.a.property('city')
          })
          it('should return state level information', () => {
            expect(result).to.have.a.property('state')
          })
          it('should return country level information', () => {
            expect(result).to.have.a.property('country')
          })
          it('should return continent level information', () => {
            expect(result).to.have.a.property('continent')
          })
          it('should return location information', () => {
            expect(result).to.have.a.property('location')
          })
        })
      }
    })
  })
