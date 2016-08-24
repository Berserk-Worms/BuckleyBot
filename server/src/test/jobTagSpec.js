import { expect } from 'chai';
import Job from '../models/jobModel';
import Tag from '../models/tagModel';
import JobTag from '../models/jobTagModel';
import request from 'supertest';
import app from '../server';
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
    });

    after((done) => {
      db.sync({force: true})
      .then(() => {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should return 201 when successfully posting a new association to the job tag join table', (done) => {
      request(app)
      .post('/api/jobs/tags')
      .send({ jobId: 1, tagId: 1 })
      .expect(201, done);
    });

    it('should return 200 when for existing associations in the job tag join table', (done) => {   
      request(app)
      .post('/api/jobs/tags')
      .send({ jobId: 1, tagId: 1 })
      .expect(200, done)
    });

    it('should only store unique values', () => {
      return JobTag.findAll({
        where: { jobId: 1, tagId: 1 }
      })
      .then((jobTag) => expect(jobTag.length).to.equal(1));
    });

    it('should indentify an association between the job and the tag', () => {
      return Job.findById(1)
      .then((job) => {
        return job.getTags();
      })
      .then((tags) => {
        return expect(tags[0].dataValues.name).to.equal('javascript');  
      });
    });

    it('should not indentify associations between unassociated jobs and tags', () => {
      return Tag.findById(2)
      .then((tag) => {
        return tag.getJobs();
      })
      .then((jobs) => {
        return expect(jobs.length).to.equal(0);
      });
    });

    it('should return 500 when incorrect job data is posted', (done) => {
      request(app)
      .post('/api/jobs/tags')
      .send({ jobId: 'five', tagId: 1 })
      .expect(500, done);
    });

    it('should return 500 when incorrect tag data is posted', (done) => {  
      request(app)
      .post('/api/jobs/tags')
      .send({ jobId: 1, tagId: 'one' })
      .expect(500, done);
    });

  });

});