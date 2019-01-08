import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

let token;


const redflag = {
  title: 'Money hidden in soak away',
  location: '4.34454, 7.88838',
  comment: 'Hidden by some politician nearby',
  images: 'girl', 
  videos: 'google.com',
};

const intervention = {
  title: 'Money hidden in soak away',
  location: '4.34454, 7.88838',
  comment: 'Hidden by some poliyician nearby',
  images: 'girl',
  videos: 'google.com',
};

const user = {
            firstname: 'Marcel',
            lastname: 'Marce',
            othername: 'Aug',
            email: 'marcel@gmail.com',
            password: 'may',
            phone: '0906746459',
            username: 'augma'
          }

  const userSignin = {
    email: 'marcel@gmail.com',
    password: 'may'
  }

describe('POST Requests', () => {

  describe ('POST /api/v1/auth/signup', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].user.firstname).to.equal('Marcel');
          token = res.body.data[0].token;
          done();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should sign in a user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send(userSignin)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].user.firstname).to.equal('Marcel');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should not sign in a non-existent user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'madea@gmail.com',
                password: 'mapody' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].message).to.equal('Username or password is incorrect');
          done();
        });
    });
  });

  describe ('POST /api/v1/redflags', () => {
    it('should create a new redflag', (done) => {
      request(app)
        .post('/api/v1/redflags')
        .set('token', token)
        .send(redflag)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].message).to.equal('Created Red-flag Record');
          done();
        });
    });
  });

  
describe ('POST /api/v1/interventions', () => {
  it('should create a new intervention', (done) => {
    request(app)
      .post('/api/v1/interventions')
      .set('token', token)
      .send(intervention)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].message).to.equal('Created Intervention Record');
        done();
      });
  });
});

});


describe('GET Requests', () => {
  describe ('POST /api/v1/redflags', () => {
    it('should get all redflags', (done) => {
      request(app)
        .get('/api/v1/redflags')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          done();
        });
    });
  });
})