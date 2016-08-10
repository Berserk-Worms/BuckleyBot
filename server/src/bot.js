import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config();

const BUCKLEY = Botkit.slackbot({
  debug: false
});

BUCKLEY.spawn({
  //Create .env file in the root directory and add SLACK_BOT_TOKEN
  token: process.env.SLACK_BOT_TOKEN
}).startRTM();

BUCKLEY.hears("", ['direct_message'], function(bot, message) {
  console.log('replying to message');
  bot.startConversation(message, askFirstName);
});

let askFirstName = (response, convo) => {
  convo.ask("Hi There! Nice to meet you. My Name is Buckley, What's yours?", (response, convo) => {
    convo.say("Nice to meet you " + response.text + "!");
    askLocation(response, convo);
    convo.next();
  });
}

let askLocation = (response, convo) => {
  convo.ask("Where are you from?", (response, convo) => {
    convo.say("I heard that " + response.text + " is a great place. Well I'll be here to help you out if you need me!")
    convo.next();
  });
}

