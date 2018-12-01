const chai = require('chai');
const request = require('supertest');
const app = require('../app');

const expect = chai.expect;


describe ('GET Requests', () => {
  describe ('GET /api/v1', () => {
    it('should get the homepage', (done) => {
      request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.empty;
          done();
        });
    });
  })

  describe ('GET /api/v1/about', () => {
    it('should get the about page', (done) => {
      request(app)
        .get('/api/v1/about')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.empty;
          done();
        });
    });
  })
})
