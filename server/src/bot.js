import Botkit from 'botkit';
import dotenv from 'dotenv';
import Team from './models/teamModel';
import userJobsListener from './bots/job';
import helper from './bots/helper';

dotenv.config();

const store = {};

const connection = Botkit.slackbot({
  //this will make it possible to be interactive with
  //the convo.ask function
  interactive_replies: true,
  debug: false,
})


//allow you to do RTM without having to create a new team
//note this is imported to server.js first
//then to teamModel (for hook afterCreate)
const teams = () => {
  console.log('starting instances of bots in database')
  Team.findAll()
    .then(teams => {
      for (let i = 0; i < teams.length; i++) {
        let data = teams[i].dataValues;
        let temp = connection.spawn({
          token: data.slackBotToken,
          //add a retry to count to let the bot reconnect 
          //automatic retries are disabled by default
          retry: 20
        });
        //dangerous! slack team tokens....
        store[data.slackTeamId] = temp.startRTM();
        // store[data.slackTeamId].startRTM();

        // console.log(store[data.slackTeamId])
      }
      // console.log('this is the store of teams: ', store)
    });
}

const addTeamBot = (createdTeam) => {
  let data = createdTeam.dataValues;
  let temp = connection.spawn({
    token: data.slackBotToken,
    retry: 20
  });

  store[data.slackTeamId] = temp;
  store[data.slackTeamId].startRTM();
}

//Handle different bot listeners
connection.hears(["jobs", "job"], ['direct_message'], function(bot, message) {
  //checkStage checks if profile has been completed
  helper.checkStage(bot, message);
  userJobsListener.replyWithJobs(bot, message);
});

// const BUCKLEY = connection.spawn({
//   //Create .env file in the root directory and add SLACK_BOT_TOKEN
//   token: process.env.SLACK_BOT_TOKEN
// });

// BUCKLEY.startRTM();

connection.hears("weather", ['direct_message'], (bot, message) => {
  console.log('replying to message');
  bot.reply(message, 'Great weather today huh?');
});

connection.hears("", ['direct_message'], (bot, message) => {
  bot.reply(message, `I didn't quite get that. Try asking me about jobs!`);
});

connection.on('rtm_open', (bot) => {
  console.log(`** The RTM api just opened at ${Date.now()}`);
})

connection.on('rtm_close', (bot) => {
  console.log(`** The RTM api just closed at ${Date.now()}`);
  //Need to determine if the retry or the bot.startRTM is reconnecting
  // bot.startRTM((err, bot, payload) => {
  //   if (err) {
  //     throw new Error('Could not connect to Slack');
  //   }
  // });
});

connection.on('rtm_reconnect_failed', (bot) => {
  console.log(`** The RTM api retry attempts have been exhausted at ${Date.now()}`);
})

export { store, teams, addTeamBot, connection };




