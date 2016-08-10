import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a user model

let User = db.define('user', {
  name: Sequelize.STRING, 
  accessToken: Sequelize.STRING,
  //Slack id retrieved at https://slack.com/api/users.list
  //and returns all member id in a team. slack_id under
  //members[n].id
  slackUserId: Sequelize.STRING,
  //team id retrieved at https://slack.com/api/team.info
  //and returns team info. team_id under team.id
  teamId: Sequelize.STRING,
  email: Sequelize.STRING
});

User.sync()
  .then(err => {
    console.log('User table is connected')
  }, err => {
    console.log('An error occured while generating the User table.')
  });

export default User;

