import db from '../db/db-config';
import Sequelize from 'sequelize';
import { teams } from '../bot';

//Generates Team model
let Team = db.define('team', {
  slackTeamToken: Sequelize.STRING,
  slackTeamName: Sequelize.STRING,
  slackTeamId: Sequelize.STRING,
  slackBotId: Sequelize.STRING,
  slackBotToken: Sequelize.STRING
});

Team.hook('afterCreate', (team, options) => {
  //invoke the method from bot.js for looping through teams
  //this will allow the bot.js store to have {teamid: instance of bot}
  //of the newly created team
  teams();
});

Team.sync()
  .then(() => {
    console.log('Team table is connected');
  }, (err) => {
    console.log('An error occured while generating the Team table');
  });

export default Team;