const debug = require('debug')('geo-from-ip:test')
const geo = require('../lib/geo-from-ip.js')

debug('Generating 5 random IPs to run tests upon')

describe(`geo-from-ip`, () => {
  describe(`error`, () => {
    test(`0`, () => {
      const result = geo.allData(`0`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`0.0.0.0`, () => {
      const result = geo.allData(`0.0.0.0`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`127.0.0.1`, () => {
      const result = geo.allData(`127.0.0.1`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`10.0.0.1`, () => {
      const result = geo.allData(`10.0.0.1`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`172.16.0.1`, () => {
      const result = geo.allData(`172.16.0.1`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`192.168.0.1`, () => {
      const result = geo.allData(`192.168.0.1`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`255.255.255.255`, () => {
      const result = geo.allData(`255.255.255.255`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
  })

  describe(`allData`, () => {
    test(`1.1.1.1`, () => {
      const result = geo.allData(`1.1.1.1`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`8.8.8.8`, () => {
      const result = geo.allData(`8.8.8.8`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`18.12.25.208`, () => {
      const result = geo.allData(`18.12.25.208`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`53.251.2.108`, () => {
      const result = geo.allData(`53.251.2.108`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`95.84.136.77`, () => {
      const result = geo.allData(`95.84.136.77`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`199.188.195.120`, () => {
      const result = geo.allData(`199.188.195.120`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
    test(`223.63.194.232`, () => {
      const result = geo.allData(`223.63.194.232`)
      expect(result).toBeDefined()
      expect(result).toMatchSnapshot()
    })
  })
})
