import { expect } from 'chai';
import rp from 'request-promise';
import db from '../db/db-config';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import JobTag from '../models/jobTagModel';

describe('tagController', () => {

  describe('Tag Creation', () => {
    //Clear database after tests run

    before((done) => {
      Job.create({
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      });

      Job.create({
        title: 'Software Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
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

    it('should return 200 when successfully creating a new tag', (done) => {
      //Assign the javascript tag to the first job in the database;
      let job = { id: 1 };
      let tagData = 'javascript';

      rp({
        url: 'http://localhost:8080/api/tags/job',
        method: 'POST',
        json: { job, tagData },
        resolveWithFullResponse: true 
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it('should successfully save the tag', (done) => {
      Tag.findById(1)
      .then((tag) => {
        expect(tag.dataValues.name).to.equal('javascript');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    })

    it('should create an association between the tag and the job', (done) => {
      Tag.findById(1, {
        include: [Job]
      })
      .then((tag) => {
        expect(tag.jobs[0].dataValues.id).to.equal(1);
        expect(tag.jobs[0].dataValues.title).to.equal('Lead Engineer');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    })

    it('should return 200 when posting an existing tag to a job', (done) => {
      //Add the existing javascript tag to the second job
      let job = { id: 2 };
      let tagData = 'javascript';

      rp({
        url: 'http://localhost:8080/api/tags/job',
        method: 'POST',
        json: { job, tagData },
        resolveWithFullResponse: true 
      })
      .then((res, tag) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body[0].tagId).to.equal(1);
        expect(res.body[0].jobId).to.equal(2);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })

    it('should return 500 when incorrect tag data is posted', (done) => {
      let job = { id: 1 };
      let tagData = { incorrect: 'data' };

      rp({
        url: 'http://localhost:8080/api/tags/job',
        method: 'POST',
        json: { job, tagData },
        resolveWithFullResponse: true 
      })
      .catch((err) => {
        expect(err.statusCode).to.equal(500);
        done();
      });
    })

    it('should return 500 when incorrect job data is posted', (done) => {
      let job = { id: 'five' };
      let tagData = 'angular';

      rp({
        url: 'http://localhost:8080/api/tags/job',
        method: 'POST',
        json: { job, tagData },
        resolveWithFullResponse: true 
      })
      .catch((err) => {
        expect(err.statusCode).to.equal(500);
        done();
      });
    })

    it('should return 500 when no data is posted', (done) => {
      rp({
        url: 'http://localhost:8080/api/tags/job',
        method: 'POST',
        resolveWithFullResponse: true 
      })
      .catch((err) => {
        expect(err.statusCode).to.equal(500);
        done();
      });
    })

  });

});