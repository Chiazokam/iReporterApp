import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

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
           firstname: "Jennifer",
           lastname: "Dora",
           othername: "Fisher",
           email: "fisher@gmail.com",
           password: "fisher",
           phone: "09032425342",
           username: "fish"
     }

describe('POST Requests', () => {


  describe('POST /api/v1/redflags', () => {
    it('should return an error if record is not created', (done) => {
      request(app)
        .post('/api/v1/redflags')
        .send() // sending no data should return an error
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.be.an('object');
          done();
        });
    });
  });

  describe.only('POST /api/v1/redflags', () => {
    it('should create a new redflag', (done) => {
      request(app)
        .post('/api/v1/redflags')
        .send(record)
        .end((err, res) => {
          // expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
        //  expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].title).to.equal('Money hidden in soak away');
          done();
        });
    });
  });

  describe.only('POST /api/v1/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          // expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
        //  expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].user[0].firstname).to.equal('Amaka');
          done();
        });
    });
  });
});

/* GET Routes */
describe('GET Requests', () => {
  describe('GET /', () => {
    it('should get the homepage', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Welcome to iReporter');
          done();
        });
    });
  });

  describe('GET /api/v1/redflags', () => {
    it('should get all the redflag records', (done) => {
      request(app)
        .get('/api/v1/redflags')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/interventions', () => {
    it('should get all the intervention records', (done) => {
      request(app)
        .get('/api/v1/interventions')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/redflags/10', () => {
    it('should return an error if record is not found', (done) => {
      request(app)
        .get('/api/v1/redflags/10')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Record not found');
          done();
        });
    });
  });

  describe('GET /api/v1/redflags/1', () => {
    it('should get one redflag', (done) => {
      request(app)
        .get('/api/v1/redflags/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/interventions/10', () => {
    it('should return an error if record is not found', (done) => {
      request(app)
        .get('/api/v1/interventions/10')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Record not found');
          done();
        });
    });
  });

  describe('GET /api/v1/interventions/1', () => {
    it('should get one intervention', (done) => {
      request(app)
        .get('/api/v1/interventions/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
});

/* PATCH Routes */
describe('PATCH Requests', () => {
  describe('PATCH /api/v1/redflags/2/comment', () => {
    it('should edit the comment', (done) => {
      request(app)
        .patch('/api/v1/redflags/1/comment')
        .send(redflag)
        .end((err, res) => {
          console.log(res)
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });

  describe('PATCH /api/v1/interventions/1/comment', () => {
    it('should edit the intervention comment', (done) => {
      request(app)
        .patch('/api/v1/interventions/1/comment')
        .send(redflag)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });

  describe('PATCH /api/v1/redflags/1/location', () => {
    it('should edit the location', (done) => {
      request(app)
        .patch('/api/v1/redflags/1/location')
        .send(redflag)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });

  describe('PATCH /api/v1/interventions/1/location', () => {
    it('should edit the location', (done) => {
      request(app)
        .patch('/api/v1/interventions/1/location')
        .send(redflag)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });
});

/* DELETE Routes */
describe('DELETE Requests', () => {
  describe('DELETE /api/v1/interventions/1', () => {
    it('should delete the intervention', (done) => {
      request(app)
        .delete('/api/v1/interventions/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });

  describe('DELETE /api/v1/redflags/1', () => {
    it('should delete a redflag if not found', (done) => {
      request(app)
        .delete('/api/v1/redflags/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Record not found');
          done();
        });
    });
  });
});
