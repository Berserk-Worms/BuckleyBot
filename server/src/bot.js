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
});

const spawnBot = (team) => {
  let data = team.dataValues;
  let temp = connection.spawn({
    token: data.slackBotToken,
    retry: 20
  });
  store[data.slackTeamId] = temp.startRTM();
};

//allow you to do RTM without having to create a new team
//note this is imported to server.js first on server start
//then to teamModel after any team is created
const teams = () => {
  console.log('starting instances of bots in database')
  Team.findAll()
    .then(teams => {
      teams.forEach((team) => {
        spawnBot(team); 
      });
    });
};

const addTeamBot = (createdTeam) => {
  spawnBot(createdTeam);
};

//Adding key words bot responds to (hears) and event listeners (on)
//Handle different bot listeners
connection.hears(["jobs", "job"], ['direct_message'], function(bot, message) {
  //checkStage checks if profile has been completed
  helper.checkStage(bot, message);
  userJobsListener.replyWithJobs(bot, message);
});

connection.hears("weather", ['direct_message'], (bot, message) => {
  console.log('replying to message');
  bot.reply(message, 'Great weather today huh?');
});

connection.hears("", ['direct_message'], (bot, message) => {
  bot.reply(message, `I didn't quite get that. Try asking me about jobs!`);
});

connection.on('rtm_open', (bot) => {
  console.log(`** The RTM api just opened at ${Date.now()}`);
});

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
});

export { store, teams, addTeamBot, connection };




