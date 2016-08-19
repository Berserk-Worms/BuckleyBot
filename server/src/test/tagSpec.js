import { expect } from 'chai';
import request from 'request';
import db from '../db/db-config';
import Tag from '../models/tagModel';

describe('tagController', () => {

  describe('Tag Creation', () => {
    //Clear database after tests run
    after((done) => {
      db.sync({force: true})
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should return 201 when successfully creating a new tag', (done) => {
      let tagData = 'javascript';

      request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(201);
        done();
      })
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

    it('should return 200 when posting an existing tag', (done) => {
      let tagData = 'javascript';

      request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(1);
        done();
      })

    })

    it('should return 500 when incorrect tag data is posted', (done) => {
      let tagData = { incorrect: 'data' };

      request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        if (err) { done(err) }
        expect(res.statusCode).to.equal(500);
        done();
      })
    })

    it('should return 500 when no data is posted', (done) => {
      request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        resolveWithFullResponse: true 
      }, (err, res, body) => {
        expect(res.statusCode).to.equal(500);
        done();
      })
    })

  });

});