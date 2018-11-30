const assert = require('chai').assert;
const app = require('../app')
const request = require("request");

const base_url = "http://localhost:3000/api/v1";
const about_url = "http://localhost:3000/api/v1/about";

describe('iReporter', function(){
  describe("GET /", function() {
    it("Root page returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });

  describe("GET /about", function() {
    it("About page returns status code 200", function(done) {
      request.get(about_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
});
