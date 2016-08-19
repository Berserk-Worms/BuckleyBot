import { expect } from 'chai';
import rp from 'request-promise';
import db from '../db/db-config';
import Job from '../models/jobModel';

describe('jobController', () => {

  describe('Job Creation', () => {

     //Clear Database before tests run
    before((done) => {
      db.sync({force: true})
      .then(done())
      .catch(function(err) {
        done(err);
      });

      let jobData = {
        title: 'Software Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date()
      }

      let tagsData = 'javascript';

      rp({
        url: 'http://localhost:8080/api/job',
        method: 'POST',
        json: { jobData, tagsData}
      });
    })

    it('should create a new job', (done) => {
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date()
      }

      let tagsData = 'javascript'

      rp({
        url: 'http://localhost:8080/api/job',
        method: 'POST',
        json: { jobData, tagsData},
        resolveWithFullResponse: true 
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should save the job to the database', (done) => {
      //Check to see if the job created in the before action 
      //is in the database

      Job.findById(1)
      .then((job) => {
        expect(job.dataValues.title).to.equal('Software Engineer');
        expect(job.dataValues.company).to.equal('Keen.io');
        done()
      })
    })
  });
})