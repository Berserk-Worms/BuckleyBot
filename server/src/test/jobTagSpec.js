  import { expect } from 'chai';
  import Job from '../models/jobModel';
  import Tag from '../models/tagModel';
  import JobTag from '../models/jobTagModel';
  import rp from 'request-promise';
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
        })
        Tag.create({
          name: 'javascript'
        })
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
        // let jobId = 1;
        // let tagId = 1;
        // rp({
        //   url: 'http://localhost:8080/api/jobs/tags',
        //   method: 'POST',
        //   json: { jobId, tagId },
        //   resolveWithFullResponse: true 
        // })
        // .then((res) => {
        //   expect(res.statusCode).to.equal(201);
        //   done();
        // })  
        // .catch((err) => {
        //   console.log(err);
        //   done();
        // });
        done();
      })
    })

  })
    
    
    // it('should return 500 when incorrect job data is posted', (done) => {
    //   let job = { id: 'five' };
    //   let tagData = 'angular';

    //   rp({
    //     url: 'http://localhost:8080/api/tags/job',
    //     method: 'POST',
    //     json: { job, tagData },
    //     resolveWithFullResponse: true 
    //   })
    //   .catch((err) => {
    //     expect(err.statusCode).to.equal(500);
    //     done();
    //   });
    // })

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