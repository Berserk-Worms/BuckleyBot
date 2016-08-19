import { expect } from 'chai';
import rp from 'request-promise';
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
      .catch(function(err) {
        done(err);
      });
    })


  })

})