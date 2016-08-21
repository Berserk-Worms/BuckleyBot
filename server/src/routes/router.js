import path from 'path';
import authTeamController from '../controllers/authTeamController';
import teamController from '../controllers/teamController';
import userController from '../controllers/userController';
import jobController from '../controllers/jobController';
import tagController from '../controllers/tagController'
import jobTagController from '../controllers/jobTagController';
import buttonController from '../controllers/buttonController';
import userJobController from '../controllers/userJobController';
import userTagController from '../controllers/userTagController';

// Passport stuff
import passportConfig from '../utils/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

export default (app, express) => {

  // API ROUTES

  //////////////////////////////////////////////
  //Handling Oauth
  //////////////////////////////////////////////
  // TODO: fix this so that it is in the authController!
  app.get('/slack/teams/auth', authTeamController.authTeam);
  app.get('/slack/users/auth', userController.checkAuthCode);
  app.get('/slack/users/data', requireAuth, userController.getUserData);

  //////////////////////////////////////////////
  //Handling Team
  //////////////////////////////////////////////
  app.get('/api/teams', teamController.findAllTeams);
  app.post('/api/teams', teamController.addTeam);

  //////////////////////////////////////////////
  //Handling Users
  //////////////////////////////////////////////
  app.get('/slack/users/:slackUserId', userController.findUser);
  app.post('/slack/users', userController.addUsers);
  app.put('/slack/users', userController.updateLocation);

  //////////////////////////////////////////////
  //Handling Job
  //////////////////////////////////////////////
  app.post('/api/jobs', jobController.addJob);

  //////////////////////////////////////////////
  //Handling Tag
  //////////////////////////////////////////////
  app.get('/api/tags', tagController.findAllTags);
  app.post('/api/tags', tagController.addTag);

  //////////////////////////////////////////////
  //Handling JobTag
  //////////////////////////////////////////////
  app.post('/api/jobs/tags', jobTagController.addJobTag);

  //////////////////////////////////////////////
  //Handling Interactive Buttons
  //////////////////////////////////////////////
  app.post('/slack/receive', buttonController.buttonDispatcher);
  
  //////////////////////////////////////////////
  //Handling Error
  //////////////////////////////////////////////
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname + '/../../../client/index.html'));
  });
}
