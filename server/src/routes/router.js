import userController from '../Users/UserController';
import profileController from '../Profile/ProfileController';

module.exports = (app, express) => {
  //////////////////
  //Handling Users
  //////////////////
  app.get('/slack/users', userController.findUser);
  app.post('/slack/users', userController.addUser);
  app.delete('/slack/users', userController.deleteUser);

  //////////////////
  //Handling Profile
  //////////////////
  app.get('/slack/users/profile', profileController.findProfile);
  app.post('/slack/users/profile', profileController.addProfile);
  app.put('/slack/users/profile', profileController.updateProfile);
  app.delete('/slack/users/profile', profileController.deleteProfile);

  //////////////////
  //Handling Oauth
  //////////////////
  app.get('/slack/users/auth', userController.authUser);
}