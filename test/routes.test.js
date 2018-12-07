const chai = require('chai');
const request = require('supertest');
const app = require('../app');

const expect = chai.expect;

describe('POST Requests', () => {
  const redflag = {
    id: 98,
    title: 'Money hidden in soak away',
    createdOn: '02-11-18',
    createdBy: 453,
    type: 'redflag',
    status: 'draft',
    location: '4.34454, 7.88838',
    comment: 'Hidden by some poliyician nearby',
    image: 'girl',
    video: 'https://images.unsplash.com/photo-1543738096-79099a610293?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc86c5221409d8d4a93d34c017ecefee&auto=format&fit=crop&w=334&q=80',
  };

  describe('POST /api/v1/redflags', () => {
    it('should return an error if record is not created', (done) => {
      request(app)
        .post('/api/v1/records')
        .send()   // sending no data should return an error
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Incomplete data');
          done();
        });
    });
  });

  describe('POST /api/v1/redflags', () => {
    it('should create a new redflag', (done) => {
      request(app)
        .post('/api/v1/records')
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
  });

  describe ('GET /api/v1/redflags', () => {
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

  describe ('GET /api/v1/interventions', () => {
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

  describe ('GET /api/v1/redflags/10', () => {
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

  describe ('GET /api/v1/redflags/1', () => {
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

  describe ('GET /api/v1/interventions/10', () => {
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

  describe ('GET /api/v1/interventions/1', () => {
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

/* PATCH Routes*/
describe ('PATCH Requests', () => {
  describe ('PATCH /api/v1/redflags/1/comment', () => {
    it('should edit the comment', (done) => {
      request(app)
        .patch('/api/v1/redflags/1/comment')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.id).to.equal(1);
          done();
        });
    });
  });

  describe ('PATCH /api/v1/interventions/1/comment', () => {
    it('should edit the intervention comment', (done) => {
      request(app)
        .patch('/api/v1/interventions/1/comment')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.id).to.equal(1);
          done();
        });
    });
  });
});
