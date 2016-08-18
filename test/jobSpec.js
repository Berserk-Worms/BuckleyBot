var expect = require('chai').expect;
var rp = require('request-promise')
var db = require('../server/dist/db/db-config.js');

describe('jobController', function() {

  //Clear Database before tests run
  before(function(done) {
    db.default.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
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

  describe('Job Creation', function() {

    it('should create a new job', function(done) {
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
        console.log('this is the res', res);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    
  });
})

