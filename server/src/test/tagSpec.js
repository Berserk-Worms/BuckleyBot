import { expect } from 'chai';
import request from 'supertest';
import app from '../server';
import db from '../db/db-config';
import Tag from '../models/tagModel';

describe('tagController', () => {
  
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

  describe('Tag Creation', () => {
    //Clear database after tests run

    it('should return 201 when successfully creating a new tag', (done) => {
      let tagData = 'javascript';

      request(app)
      .post('/api/tags')
      .send({ tagData })
      .expect(201, done);
    });

    it('should successfully save the tag', () => {
     return Tag.findById(1)
      .then((tag) => expect(tag.dataValues.name).to.equal('javascript'));
    });

    it('should return 200 when posting an existing tag', (done) => {
      let tagData = 'javascript';

      request(app)
      .post('/api/tags')
      .send({ tagData })
      .expect(200)
      .end((err, result) => {
        if (err) { done(err); }
        expect(result.body.id).to.equal(1);
        done();
      });
    });

    it('should return 500 when incorrect tag data is posted', (done) => {
      let tagData = { incorrect: 'data' };

      request(app)
      .post('/api/tags')
      .send({ tagData })
      .expect(500, done);
    });

    it('should return 500 when no data is posted', (done) => {     
      request(app)
      .post('/api/tags')
      .send({})
      .expect(500, done);
    });

  });

});