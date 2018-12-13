import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import createTables from '../src/models/createTables'
import dropTables from '../src/models/dropTables'

dropTables();
createTables();

const record = {
  title: 'Money hidden in soak away',
  createdBy: 1,
  type: 'redflag',
  status: 'draft',
  location: '4.34454, 7.88838',
  comment: 'Hidden by some poliyician nearby',
  image: 'girl',
  video: 'https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80',
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
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('should sign in a user', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
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

  describe('POST /api/v1/auth/signin', () => {
    it('should sign in a non-existent user', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'madea@gmail.com',
                password: 'mapody' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].message).to.equal('Sorry, User does not exist');
          done();
        });
    });
  });
});
