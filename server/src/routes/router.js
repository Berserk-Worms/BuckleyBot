import path from 'path';
import teamController from '../controllers/teamController';
import userController from '../controllers/userController';
import jobController from '../controllers/jobController';
import tagController from '../controllers/tagController'
import jobTagController from '../controllers/jobTagController';
import buttonController from '../controllers/buttonController';
import userJobController from '../controllers/userJobController';

// Passport stuff
import passportConfig from '../utils/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

export default (app, express) => {

  // API ROUTES

  //////////////////////////////////////////////
  //Handling Team Oauth
  //////////////////////////////////////////////
  app.get('/slack/teams/auth', teamController.addTeam);

  //////////////////////////////////////////////
  //Handling Users
  //////////////////////////////////////////////

  // TODO: fix this so that it is in the userController!
  app.post('/slack/users', userController.addUsers);
  app.put('/slack/users', userController.updateLocation)

  // Grabbing user data
  app.get('/slack/users/data', requireAuth, userController.getUserData);

  //////////////////////////////////////////////
  //Handling Oauth
  //////////////////////////////////////////////
  app.get('/slack/users/auth', userController.checkAuthCode);

  //////////////////////////////////////////////
  //Handling Job
  //////////////////////////////////////////////
  app.post('/api/job', jobController.addJob);

  //////////////////////////////////////////////
  //Handling Tag
  //////////////////////////////////////////////
  app.post('/api/tags/job', tagController.addJobTags);

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
