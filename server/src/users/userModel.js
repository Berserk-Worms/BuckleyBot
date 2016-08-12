import db from '../db/db-config';
import Team from '../teams/teamModel'; 
import Sequelize from 'sequelize';

//Generates User model
let User = db.define('user', {
  name: Sequelize.STRING, 
  accessToken: Sequelize.STRING,
  slackUserId: Sequelize.STRING,
  slackTeamId: Sequelize.STRING,
  email: Sequelize.STRING
});

//Add teamId to the profile as a foreign key
User.belongsTo(Team);

User.sync()
  .then(err => {
    console.log('User table is connected');
  }, err => {
    console.log('An error occured while generating the User table.');
  });

export default User;
