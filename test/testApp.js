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
  });
});

describe('POST Requests', () => {
  const user = {
    userId: 'fe1510e5-366f-405b-a189-526b1ee87331',
    fname: 'Amarachi',
    lname: 'Gayo',
    othername: 'Mira',
    email: 'miragayo@amarachi.com',
    phone: '0804563888',
    username: 'Mayo',
    password: 'hello',
    registered: true,
    isAdmin: 'no',
  };

  const userSignIn = {
    email: 'miragayo@amarachi.com',
    password: 'hello'
  };

  describe('POST /api/v1/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].fname).to.equal('Amarachi');
          done();
        });
    });
  });

  describe('POST /api/v1/signin', () => {
    it('should authenticate a user', (done) => {
      request(app)
        .post('/api/v1/signin')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.empty;
          done();
        });
    });
  });
});
