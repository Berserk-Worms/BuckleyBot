import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config();

const UNCLE = Botkit.slackbot({
  debug: false
});

UNCLE.spawn({
  //Create .env file in the root directory and add SLACK_BOT_TOKEN
  token: process.env.SLACK_BOT_TOKEN
});
// }).startRTM();

UNCLE.hears('', ['direct_message'], function(bot, message) {
  console.log('replying to message');
  let responses = ["Yooo It's your boi JBuxxx, wats good?"]
  bot.reply(message, responses[0]);
});


