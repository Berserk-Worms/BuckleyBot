import { expect } from 'chai';
import request from 'supertest';
import app from '../server';
import db from '../db/db-config';
import Job from '../models/jobModel';

describe('jobController', () => {

  before((done) => {
    app.on("appStarted", function( ) {
      done()
    });
  })

  //Clear Database after tests run
  after((done) => {
    db.sync({force: true})
    .then(() => {
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });

  describe('Job Creation', () => {

    it('should return 201 when successfully creating a new job', (done) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      request(app)
      .post('/api/jobs')
      .send({ jobData })
      .expect(201, done)
    });

    it('should save the job to the database', () => {
      //Check to see if the job created in the before action 
      //is in the database
      return Job.findById(1)
      .then((job) => {
        expect(job.dataValues.title).to.equal('Lead Engineer');
        expect(job.dataValues.company).to.equal('Keen.io');
      })
    });

    it('should return 200 for an existing job', (done) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      request(app)
      .post('/api/jobs')
      .send({ jobData })
      .expect(200, done);
    })

    it('should create a new job when the date is different', (done) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-02')
      }

      request(app)
      .post('/api/jobs')
      .send({ jobData })
      .expect(201, done);
    })

    it('should return 500 when there is no job data sent', (done) => {
      request(app)
      .post('/api/jobs')
      .send({})
      .expect(500, done)
    });

    it('should return 500 when the job data is sent in the wrong format', (done) => {
      let jobData = {
        title: 'Best Egineer'
      }

      request(app)
      .post('/api/jobs')
      .send({ jobData })
      .expect(500, done);
    });

    it('should not save the job data that is sent in the wrong format', () => {
      
      return Job.findOne({ where: {title: 'Best Engineer'} })
      .then((job) => expect(job).to.equal(null));

    });
  });
});