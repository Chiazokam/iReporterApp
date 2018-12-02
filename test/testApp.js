const chai = require('chai');
const request = require('supertest');
const app = require('../app');

const expect = chai.expect;

/* GET Routes*/
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

/* POST Routes*/
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

  const intervention = {
       id: 5,
       title: "Broken bridge",
       createdOn: "02-12-18",
       createdBy: 789,
       type: "intervention",
       status: "draft",
       location: "4.34454, 7.88838",
       comment: "The bridge is about to collapse",
       image_url: "https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80",
       video_url: "https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80"
     }

     const redflag = {
          id: 98,
          title: "Money hidden in soak away",
          createdOn: "02-11-18",
          createdBy: 453,
          type: "redflag",
          status: "draft",
          location: "4.34454, 7.88838",
          comment: "Hidden by some poliyician nearby",
          image_url: "https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80",
          video_url: "https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80"
        }

  describe('POST /api/v1/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
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

  describe('POST /api/v1/interventions', () => {
    it('should create a new intervention', (done) => {
      request(app)
        .post('/api/v1/45/interventions')
        .send(intervention)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].title).to.equal('Broken bridge');
          done();
        });
    });
  });

  describe('POST /api/v1/redflags', () => {
    it('should create a new redflag', (done) => {
      request(app)
        .post('/api/v1/67/redflags')
        .send(redflag)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].title).to.equal('Money hidden in soak away');
          done();
        });
    });
  });
});
