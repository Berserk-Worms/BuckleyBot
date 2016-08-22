import { expect } from 'chai';
import request from 'request-promise';
import db from '../db/db-config';
import Job from '../models/jobModel';

describe('jobController', () => {

    //Clear Database after tests run
    before((done) => {
      db.sync({force: true})
      .then(() => {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

  describe('Job Creation', () => {

    it('should return 201 when successfully creating a new job', () => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      return request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true
      })
      .then((res) => expect(res.statusCode).to.equal(201));

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

    it('should return 200 for an existing job', () => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      return request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      })
      .then(res => expect(res.statusCode).to.equal(200));

    })

    it('should create a new job when the date is different', (  ) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-02')
      }

      return request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      })
      .then(res => expect(res.statusCode).to.equal(201));

    })

    it('should return 500 when there is no job data sent', () => {

      return request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: {},
        resolveWithFullResponse: true 
      })
      .catch(err => expect(err.statusCode).to.equal(500));
      
    });

    it('should return 500 when the job data is sent in the wrong format', () => {
      let jobData = {
        title: 'Best Egineer'
      }

      return request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      })
      .catch(err => expect(err.statusCode).to.equal(500));

    });

    it('should not save the job data that is sent in the wrong format', () => {
      
      return Job.findOne({ where: {title: 'Best Engineer'} })
      .then((job) => expect(job).to.equal(null));

    });
  });
});