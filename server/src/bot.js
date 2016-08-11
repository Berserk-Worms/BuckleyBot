import Botkit from 'botkit';
import dotenv from 'dotenv';
import Team from './teams/teamModel';
dotenv.config();

const store = {};

const connection = Botkit.slackbot({
  debug: false
});

const teams = () => {
  Team.findAll()
    .then(teams => {
      for (let i = 0; i < teams.length; i++) {
        let data = teams[i].dataValues;
        let temp = connection.spawn({
          token: data.slackBotToken
        });
        //dangerous! slack team tokens....
        store[data.slackTeamId] = temp;
        store[data.slackTeamId].startRTM();

        // console.log(store[data.slackTeamId])
      }
      // console.log('this is the store of teams: ', store)
    });
}

//allow you to do RTM without having to create a new team
//note this is imported to server.js first
//then to teamModel (for hook afterCreate)
teams();

// const BUCKLEY = connection.spawn({
//   //Create .env file in the root directory and add SLACK_BOT_TOKEN
//   token: process.env.SLACK_BOT_TOKEN
// });

// BUCKLEY.startRTM();

connection.hears("", ['direct_message'], function(bot, message) {
  console.log('replying to message');
  bot.reply(message, "Hi hi captain! What's happening?");
});

export { store, teams };




