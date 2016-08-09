import teamController from '../Teams/teamController';
import userController from '../Users/UserController';
import profileController from '../Profile/ProfileController';

export default (app, express) => {
  //////////////////////////////////////////////
  //Handling Team Oauth
  //////////////////////////////////////////////
  app.get('/slack/teams/auth', teamController.addTeam);

  //////////////////////////////////////////////
  //Handling Users
  //////////////////////////////////////////////
  app.get('/slack/users', userController.findUser);
  app.post('/slack/users', userController.addUser);
  app.delete('/slack/users', userController.deleteUser);

  //////////////////////////////////////////////
  //Handling Profile
<<<<<<< ecb01819b8143dcea3e9d3bffdce19681896f6a4
  //////////////////////////////////////////////
  app.get('/slack/users/profile', profileController.findProfile);
  app.post('/slack/users/profile', profileController.addProfile);
  app.put('/slack/users/profile', profileController.updateProfile);
  app.delete('/slack/users/profile', profileController.deleteProfile);

  //////////////////////////////////////////////
  //Handling Oauth
  //////////////////////////////////////////////
  app.get('/slack/users/auth', userController.authUser);
=======
  //////////////////
  app.get('/Slack/users/profile', profileController.findProfile);
  app.post('/Slack/users/profile', profileController.addProfile);
  app.put('/Slack/users/profile', profileController.updateProfile);
  app.delete('/Slack/users/profile', profileController.deleteProfile);
  
>>>>>>> Merge master into infra-conversation
}