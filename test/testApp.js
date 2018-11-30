const chai = require('chai');
const app = require('../app')
const request = require('supertest');
const expect = chai.expect;

const base_url = "http://localhost:3000/api/v1";
const about_url = "http://localhost:3000/api/v1/about";
const get_signup_url = "http://localhost:3000/api/v1/users/new";

describe('iReporter', function(){
  let user = {
    userId: 1,
    firstname: 'Amarachi',
    lastname: 'David',
    othername: 'Stella',
    email: 'stelladavid@amarachi.com',
    phone: '09049445633',
    username: 'Mara',
    registered: true,
    isAdmin: 'false'
  }
  /*describe("GET /", function() {
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
  });*/

  /*describe("GET /users/new", function() {
    it("Sign Up page returns status code 200", function(done) {
      request.get(get_signup_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });*/
  describe("POST api/v1/users", function() {
    it('should add the new user', function(done){
      request(app)
      .post('/api/v1/users')
      .send(user)
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        done(err)
      });
    });
  });
});
