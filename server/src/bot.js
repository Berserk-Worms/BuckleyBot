import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config();

const connection = Botkit.slackbot({
  debug: false
});

const BUCKLEY = connection.spawn({
  //Create .env file in the root directory and add SLACK_BOT_TOKEN
  token: process.env.SLACK_BOT_TOKEN
});

BUCKLEY.startRTM();

connection.hears("", ['direct_message'], function(bot, message) {
  console.log('replying to message');
});

export default BUCKLEY;




