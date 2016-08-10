import db from '../db/db-config';
import Sequelize from 'sequelize';

//Generates Team model
let Team = db.define('team', {
  slackTeamToken: Sequelize.STRING,
  slackTeamName: Sequelize.STRING,
  slackTeamId: Sequelize.STRING,
  slackBotId: Sequelize.STRING,
  slackBotToken: Sequelize.STRING
});

Team.sync()
  .then(err => {
    console.log('Team table is connected');
  }, err => {
    console.log('An error occured while generating the Team table');
  });

export default Team;