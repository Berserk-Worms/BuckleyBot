  import { expect } from 'chai';
  import Job from '../models/jobModel';
  import Tag from '../models/tagModel';
  import JobTag from '../models/jobTagModel';
  import request from 'request-promise';
  import db from '../db/db-config';

  describe('jobTagController', () => {

    describe('Job Tag Association', () => {

      //Setup database entries for job and tag
      before((done) => {
        Job.create({
          title: 'Lead Engineer',
          link: 'http://example.com',
          location: 'San Francisco, CA',
          company: 'Keen.io',
          publishDate: new Date()
        });
        Tag.create({
          name: 'javascript'
        });
        Tag.create({
          name: 'react'
        });
        done();
      })

      after((done) => {
        db.sync({force: true})
        .then(() => {
          done();
        })
        .catch(function(err) {
          done(err);
        });
      });

      it('should return 201 when successfully posting a new association to the job tag join table', () => {
        
        return request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 1 },
          resolveWithFullResponse: true
        })
        .then(res => expect(res.statusCode).to.equal(201));

      })

      it('should return 200 when for existing associations in the job tag join table', () => {
        
        return request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 1 },
          resolveWithFullResponse: true
        })
        .then(res => expect(res.statusCode).to.equal(200));

      })

      it('should only store unique values', () => {
        
        return JobTag.findAll({
          where: { jobId: 1, tagId: 1 }
        })
        .then((jobTag) => expect(jobTag.length).to.equal(1));

      })

      it('should indentify an assoication between the job and the tag', () => {
        
        return Job.findById(1)
        .then((job) => {
          return job.getTags();
        })
        .then((tags) => {
          return expect(tags[0].dataValues.name).to.equal('javascript');  
        })

      })

      it('should not indentify assoications between unassociated jobs and tags', () => {
        return Tag.findById(2)
        .then((tag) => {
          return tag.getJobs();
        })
        .then((jobs) => {
          return expect(jobs.length).to.equal(0);
        })
        
      })

      it('should return 500 when incorrect job data is posted', () => {
        
        return request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 'five', tagId: 1 },
          resolveWithFullResponse: true 
        })
        .catch(err => expect(err.statusCode).to.equal(500));

      })

      it('should return 500 when incorrect tag data is posted', () => {
        
        return request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 'one' },
          resolveWithFullResponse: true 
        })
        .catch(err => expect(err.statusCode).to.equal(500));

      })

    })

  })