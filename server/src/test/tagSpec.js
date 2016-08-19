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
      let jobData = {
        title: 'Lead Engineer',
        link: 'http://example.com',
        location: 'San Francisco, CA',
        company: 'Keen.io',
        publishDate: new Date('2016-08-01')
      }

      rp({
        url: 'http://localhost:8080/api/job',
        method: 'POST',
        json: { jobData },
        resolveWithFullResponse: true 
      })
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
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
    })
  });

});