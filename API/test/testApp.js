const assert = require('chai').assert;
const app = require('../app')
const request = require("request");

const base_url = "http://localhost:3000/api/v1";

describe('iReporter', function(){
  describe("GET /", function() {
    it("Root page returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
});
