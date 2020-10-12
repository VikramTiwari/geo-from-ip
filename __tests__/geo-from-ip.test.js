const debug = require('debug')('geo-from-ip:test')
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
      const result = geo.allData(ip)

      if (result.error) {
        describe('error()', () => {
          test('should return error message and IP', () => {
            expect(Object.keys(result)).toContain('ip')
            expect(Object.keys(result)).toContain('error')
          })
        })
      } else {
        describe('allData()', () => {
          test('should return city level information', () => {
            expect(Object.keys(result)).toContain('city')
          })
          test('should return state level information', () => {
            expect(Object.keys(result)).toContain('state')
          })
          test('should return country level information', () => {
            expect(Object.keys(result)).toContain('country')
          })
          test('should return continent level information', () => {
            expect(Object.keys(result)).toContain('continent')
          })
          test('should return location information', () => {
            expect(Object.keys(result)).toContain('location')
          })
          // NOTE: We can't use snapshot tests here because the IPs are generated at runtime
        })
      }
    })
  })
