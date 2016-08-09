import userController from '../Users/UserController';
import rrofileController from '../Profile/ProfileController';

module.exports = (app, express) => {
  //////////////////
  //Handling Users
  //////////////////
  app.get('/Slack/users', userController.findUser);
  app.post('/Slack/users', userController.addUser);
  app.delete('/Slack/users', userController.deleteUser);

  //////////////////
  //Handling Profile
  //////////////////
  app.get('/Slack/users/profile', profileController.findProfile);
  app.post('/Slack/users/profile', profileController.addProfile);
  app.delete('/Slack/users/profile', profileController.deleteProfile);
  
}