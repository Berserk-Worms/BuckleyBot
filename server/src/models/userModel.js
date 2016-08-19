import db from '../db/db-config';
import Sequelize from 'sequelize';
import Team from './teamModel';
import intro from '../bots/introduction';

//Generates User model
let User = db.define('user', {
  name: Sequelize.STRING, 
  email: Sequelize.STRING,
  location: Sequelize.STRING,
  photo: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  slackUserId: {
    type: Sequelize.STRING,
    unique: true
  }, 
  slackTeamId: {
    type: Sequelize.STRING,
    references: {
      model: Team,
      key: 'slackTeamId'
    }
  }
});

//A hook that will be call after a user has been created
//Invoke the conversation bot
User.hook('afterCreate', (user, options) => {
  intro(user);
});

User.sync()
  .then(() => {
    console.log('User table is connected');
  }, (err) => {
    console.log('failed in the users table:', err);
    console.log('An error occured while generating the User table.');
  });

export default User;
