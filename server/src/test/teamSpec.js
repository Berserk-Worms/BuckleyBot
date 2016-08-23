import request from 'supertest';
import { expect } from 'chai';
import db from '../db/db-config';
import Team from '../models/teamModel';

const server = 'http://localhost:8080/';

describe('teamController', () => {

  after((done) => {
    db.sync({force: true})
    .then(() => {
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });

  describe('User Creation', () => {

      it('expects 200 on successful GET request to findAllTeams', () => {
          
      
      });



  })
})