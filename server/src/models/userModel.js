import db from '../db/db-config';
import Sequelize from 'sequelize';
import Team from './teamModel';
import intro from '../bots/introduction';

//Generates User model
let User = db.define('user', {
  name: Sequelize.STRING, 
  email: Sequelize.STRING,
  location: {
    type: Sequelize.STRING,
    defaultValue: 'San Francisco'
  },
  photo: Sequelize.STRING,
  accessToken: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  slackUserId: {
    type: Sequelize.STRING,
    primaryKey: true
    // unique: true
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

export default User;
