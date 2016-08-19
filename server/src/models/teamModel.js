import db from '../db/db-config';
import Sequelize from 'sequelize';
import { addTeamBot } from '../bot'

//Generates Team model
let Team = db.define('team', {
  slackTeamToken: Sequelize.STRING,
  slackTeamName: Sequelize.STRING,
  slackBotId: Sequelize.STRING,
  slackBotToken: Sequelize.STRING,
  slackTeamId: { 
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  }
});

Team.hook('afterCreate', (team, options) => {
  //invoke the method from bot.js for looping through teams
  //this will allow the bot.js store to have {teamid: instance of bot}
  //of the newly created team

  //should call the method where we are only adding one team
  // console.log(team);
  addTeamBot(team);
});

Team.sync()
  .then(() => {
    console.log('Team table is connected');
  }, (err) => {
    console.log('An error occured while generating the Team table:', err);
  });

export default Team;