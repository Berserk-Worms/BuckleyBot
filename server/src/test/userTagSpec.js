import { expect } from 'chai';
import Team from '../models/teamModel';
import User from '../models/userModel';
import Tag from '../models/tagModel';
import UserTag from '../models/userTagModel';
import request from 'supertest';
import app from '../server';
import db from '../db/db-config';
import rp from 'request-promise';

describe('userTagController', () => {

  describe('User Tag Association', () =>  {

    before((done) => {
      //create new db beforehand, as if you repeatedly run tests
      //will get an after done error
      db.sync({ force: true })
      .then(() => {
        //async function to create team and user
        let createSample = () => {
          Team.create({
            slackTeamToken: 'xoxp-1234',
            slackTeamName: 'BerserkMonkey',
            slackBotId: 'U1234D5AT',
            slackBotToken: 'xoxb-1234',
            slackTeamId: 'xyz'
          })
          .then(team => {
            User.create({
              name: 'JongKim',
              photo: 'https://secure.gravatar.com/avatar/kji',
              accessToken: '12345',
              slackUserId: 'abcd',
              slackTeamId: team.dataValues.slackTeamId
            });
          });
        };
        //waiting on async function to finish before test
        createSample(done);

        Tag.create({
          name: 'javascript'
        });
        Tag.create({
          name: 'node'
        });
        done();
      })
      .catch((err) => {
        done(err);
      })
    });

    after((done) => {
      db.sync({ force: true })
      .then(() => {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should return 201 when successfully posting a new association to the user tag join table', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'abcd', tagId: 1 })
      .expect(201, done);
    });

    it('should return 200 when for exisiting associations in the user tag join table', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'abcd', tagId: 1 })
      .expect(200, done);
    });

    //Note: Relies on the previous two tests which insert
    //{ slackUserId: 'abcd', tagId: 1 } twice
    it('should only store unique values', (done) => {
      let find = () => {
        return UserTag.findAll({
          where: { slackUserId: 'abcd', tagId: 1 }
        })
        .then((userTag) => {
          return expect(userTag.length).to.equal(1)
        });
      };
      find();
      done();
    });

    it('should identify an association between the user and the tag', (done) => {
      let find = () => {
        return User.findOne({
          include: [{
            model: Tag
          }]
        })
        .then(user => {
          const tag = user.dataValues.tags[0].dataValues;
          return expect(tag.name).to.equal('javascript');
        })
      };
      find();
      done();
    });

    it('should not identify associations between unassociated jobs and tags', (done) => {
      let find = () => {
        return Tag.findOne({
          where: { name: 'node' },
          include: [{
            model: User
          }]
        })
        .then(tag => {
          return expect(tag.dataValues.users.length).to.equal(0);
        })
      };
      find();
      done();
    });

    it('should return 200 when successfully deleting an association between user and tag', (done) => {
      request(app)
      .del(`/api/users/tags/abcd/${1}`)
      .expect(200, done);
    });

    it('should return 500 when incorrect user data is used for deletion', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'abcd', tagId: 1 })
      .end(() => {
        request(app)
        .del(`/api/users/tags/doesntexist/${1}`)
        .expect(500, done);
      })
    });

    it('should return 500 when incorrect tag data is used for deletion', (done) => {
      request(app)
      .del(`/api/users/tags/abcd/${2}`)
      .expect(500, done);
    })

    it('should get all known associations between user and tags', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'abcd', tagId: 2 })
      .end(() => {
        let findLength = () => { 
          UserTag.findAll({
            where: { slackUserId: 'abcd' }
          })
          .then((userTag) => {
            //userTag.length is equal to 2, but failing return
            console.log('user tagggggs,', userTag.length);
            return expect(userTag).to.have.lengthOf(2);
          });
        };
        findLength();
        done();
      });
    });

    it('should return 500 when incorrect user data is posted', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'HillaryC', tagId: 1 })
      .expect(500, done);
    });

    it('should return 500 when incorrect tag data is posted', (done) => {
      request(app)
      .post('/api/users/tags')
      .send({ slackUserId: 'abcd', tagId: 3 })
      .expect(500, done);
    })

  });

})