import db from '../db/db-config';
import Sequelize from 'sequelize';
import Team from './teamModel';
// import intro from '../bots/introduction';

//Generates User model
//TODO Add unique constraints to slackUserId
let User = db.define('user', {
  name: Sequelize.STRING, 
  accessToken: Sequelize.STRING,
  slackUserId: Sequelize.STRING,
  email: Sequelize.STRING,
  slackTeamId: {
    type: Sequelize.STRING,
    references: {
      model: Team,
      key: 'slackTeamId'
    }
  }
  //TODO: Refactor profile location, and maybe default query
  //to user. Profile to be removed
  // location: Sequelize.STRING
});

//TODO: move bot intro conversation to after user create
//currently in after profile
// User.hook('afterCreate', (user, options) => {
//   intro(user);
// });

User.sync()
  .then(() => {
    console.log('User table is connected');
  }, (err) => {
    console.log('failed in the users table:', err);
    console.log('An error occured while generating the User table.');
  });

export default User;
