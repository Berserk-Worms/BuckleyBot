import app from '../server';
import db from '../db/db-config';
import Team from '../models/teamModel';
import request from 'supertest';
import { expect } from 'chai';

const server = 'http://localhost:8080/';

describe('teamController', () => {

  before((done) => {  
    app.on("appStarted",() => {

      Team.create({
        slackTeamToken: 'TestToken',
        slackTeamName: 'TestName',
        slackBotId: 'TestBotId',
        slackBotToken: 'TestBotToken',
        slackTeamId: 'TestSlackTeamId'
      })
      .then(() => {
        Team.create({
          slackTeamToken: 'TestToken2',
          slackTeamName: 'TestName2',
          slackBotId: 'TestBotId2',
          slackBotToken: 'TestBotToken2',
          slackTeamId: 'TestSlackTeamId2'
        })
        done();
      });
    });
  });

  after((done) => {
    db.sync({force: true})
    .then(() => done())
    .catch((err) => done(err));
  });

  describe('Team Controller', () => {

    it('expect GET /api/teams to return 200', (done) => {
        
      request(app)
        .get('/api/teams')
        .expect(200, done);
    
    });

    it('expects GET /api/teams to return all team data', (done) => {
        
      request(app)
        .get('/api/teams')
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          expect(res.body[0]).to.have.property('slackBotId');
          expect(res.body[1]).to.have.property('slackBotId');
          expect(res.body[0].slackTeamToken).to.equal('TestToken');
          expect(res.body[1].slackTeamId).to.equal('TestSlackTeamId2');
          done();
        });
    
    });

    it('expect GET /api/teams:slackTeamId to return 200', (done) => {
        
      request(app)
        .get('/api/teams/TestSlackTeamId')
        .expect(200, done);
    
    });

      it('expects GET /api/teams to return all team data', (done) => {
        
      request(app)
        .get('/api/teams/TestSlackTeamId')
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          expect(res.body).to.have.property('slackBotId');
          expect(res.body.slackTeamToken).to.equal('TestToken');
          done();
        });
    
    });

    it('expect POST /api/teams to return 201 on creation', (done) => {
      let slackTeamData = {
        slackTeamToken: 'TestToken3',
        slackTeamName: 'TestName3',
        slackBotId: 'TestBotId3',
        slackBotToken: 'TestBotToken3',
        slackTeamId: 'TestSlackTeamId3'
      }

      request(app)
        .post('/api/teams')
        .send({ slackTeamData })
        .expect(201, done);
    
    });

    it('expects POST /api/teams to write to db', (done) => {
      
      let slackTeamId = 'TestSlackTeamId3';

      Team.findOne({ 
        where: { slackTeamId } 
      })
      .then(team => {
        expect(team.slackTeamName).to.equal('TestName3');
        done();
      })
      .catch(err => done(err));
    
    });

    it('expect POST /api/teams to return 200 if team exists', (done) => {
        
      let slackTeamData = {
        slackTeamToken: 'TestToken3',
        slackTeamName: 'TestName3',
        slackBotId: 'TestBotId3',
        slackBotToken: 'TestBotToken3',
        slackTeamId: 'TestSlackTeamId3'
      }

      request(app)
        .post('/api/teams')
        .send({ slackTeamData })
        .expect(200, done);

    });
  });
});