import { expect } from 'chai';
import request from 'request-promise';
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

    it('should return 201 when successfully creating a new tag', () => {
      let tagData = 'javascript';

      return request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      })
      .then(res => { 
        expect(res.statusCode).to.equal(201)
      });

    });

    it('should successfully save the tag', () => {
     
     return Tag.findById(1)
      .then((tag) => expect(tag.dataValues.name).to.equal('javascript'));

    })

    it('should return 200 when posting an existing tag', () => {
      let tagData = 'javascript';

      return request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      })
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(1);
      });

    })

    it('should return 500 when incorrect tag data is posted', () => {
      let tagData = { incorrect: 'data' };

      return request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        json: { tagData },
        resolveWithFullResponse: true 
      })
      .catch(err => expect(err.statusCode).to.equal(500));

    })

    it('should return 500 when no data is posted', () => {
      
      return request({
        url: 'http://localhost:8080/api/tags',
        method: 'POST',
        resolveWithFullResponse: true 
      })
      .catch(err => expect(err.statusCode).to.equal(500));

    })

  });

});