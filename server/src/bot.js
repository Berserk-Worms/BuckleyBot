import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config();

const controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: process.env.SLACK_BOT_TOKEN
}).startRTM();

controller.hears('', ['direct_message'], function(bot, message) {
  console.log('replying to message');
  let responses = ["I'm grumpy if I don't get my macros in"]
  bot.reply(message, responses[Math.floor(Math.random()*responses.length)]);
});


