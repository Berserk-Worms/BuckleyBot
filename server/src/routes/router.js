import teamController from '../teams/teamController';
import userController from '../users/userController';
import profileController from '../profile/profileController';

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
  //////////////////////////////////////////////
  app.get('/slack/users/profile', profileController.findProfile);
  app.post('/slack/users/profile', profileController.addProfile);
  app.put('/slack/users/profile', profileController.updateProfile);
  app.delete('/slack/users/profile', profileController.deleteProfile);

  //////////////////////////////////////////////
  //Handling Oauth
  //////////////////////////////////////////////
  app.get('/slack/users/auth', userController.authUser);
}