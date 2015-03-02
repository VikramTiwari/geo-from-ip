var expect = require("chai").expect,
    geo = require("../lib/geo-from-ip.js");

describe('Geos', function() {
    describe('#allData()', function() {
        it("should return geo and isp information", function() {
            var ip = '119.82.78.134';
            var results = geo.allData(ip);

            expect(results).to.have.a.property("city");
            expect(results).to.have.a.property("country");
            expect(results).to.have.a.property("isp");
            expect(results).to.have.a.property("org");
        })
    })
});