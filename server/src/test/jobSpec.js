import { expect } from 'chai';
import request from 'request';
import db from '../db/db-config';
import Job from '../models/jobModel';

describe('jobController', () => {

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


      request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData }
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(201);
        done()
      })
    });

    it('should save the job to the database', (done) => {
      //Check to see if the job created in the before action 
      //is in the database
      Job.findById(1)
      .then((job) => {
        expect(job.dataValues.title).to.equal('Lead Engineer');
        expect(job.dataValues.company).to.equal('Keen.io');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it('should return 200 for an existing job', (done) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(200);
        done();
      })
    })

    it('should return 500 when there is no job data sent', (done) => {

      request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: {},
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(500);
        done();
      })
      
    });

    it('should return 500 when the job data is sent in the wrong format', (done) => {
      let jobData = {
        title: 'Best Egineer'
      }

      request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(500);
        done();
      })

    });

    it('should not save the job data that is sent in the wrong format', (done) => {
      Job.findOne({ where: {title: 'Best Engineer'} })
      .then((job) => {
        expect(job).to.equal(null);
        done();
      })
      .catch((err) => {
        console.log(err)
        done();
      });
    });
  });
});