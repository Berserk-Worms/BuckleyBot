  import { expect } from 'chai';
  import Job from '../models/jobModel';
  import Tag from '../models/tagModel';
  import JobTag from '../models/jobTagModel';
  import request from 'request';
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

      it('should return 201 when successfully posting a new association to the job tag join table', (done) => {
        request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 1 }
        }, (err, res, body) => {
          if (err) { done(err) }
          expect(res.statusCode).to.equal(201);
          done();
        })
      })

      it('should return 200 when for existing associations in the job tag join table', (done) => {
        request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 1 }
        }, (err, res, body) => {
          if (err) { done(err) }
          expect(res.statusCode).to.equal(200);
          done();
        })
      })

      it('should only store unique values', (done) => {
        JobTag.findAll({
          where: { jobId: 1, tagId: 1 }
        })
        .then((jobTag) => {
          expect(jobTag.length).to.equal(1);
          done();
        })
      })

      it('should indentify an assoication between the job and the tag', (done) => {
        Job.findById(1)
        .then((job) => {
          return job.getTags();
        })
        .then((tags) => {
          expect(tags[0].dataValues.name).to.equal('javascript');
          done();
        })
        .catch((err) => {
          done(err);
        })
      })

      it('should not indentify assoications between unassociated jobs and tags', (done) => {
        Tag.findById(2)
        .then((tag) => {
          return tag.getJobs();
        })
        .then((jobs) => {
          expect(jobs.length).to.equal(0);
          done();
        })
        .catch((err) => {
          done(err);
        })
      })

      it('should return 500 when incorrect job data is posted', (done) => {
        request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 'five', tagId: 1 },
          resolveWithFullResponse: true 
        }, (err, res, body) => {
          if (err) { done(err) }
          expect(res.statusCode).to.equal(500);
          done();
        })
      })

      it('should return 500 when incorrect tag data is posted', (done) => {
        request({
          url: 'http://localhost:8080/api/jobs/tags',
          method: 'POST',
          json: { jobId: 1, tagId: 'one' },
          resolveWithFullResponse: true 
        }, (err, res, body) => {
          if (err) { done(err) }
          expect(res.statusCode).to.equal(500);
          done();
        })
      })

    })

  })
    
    


    // it('should not create a new association when an association already exists', (done) => {
    //   let job = { id: 1 };
    //   let tagData = 'javascript';

    //   rp({
    //     url: 'http://localhost:8080/api/tags/job',
    //     method: 'POST',
    //     json: { job, tagData },
    //     resolveWithFullResponse: true 
    //   })
    //   .then((resp) => {
    //     console.log('the stat code', resp.statusCode);
    //     done();
    //   })
    //   .catch((err) => {
    //     console.log('the err code', err.statusCode);
    //     done();
    //   })
    // })