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

// connection.hears("", ['direct_message'], function(bot, message) {
//   console.log('replying to message');
//   bot.startConversation(message, askFirstName);
// });

// let askFirstName = (response, convo) => {
//   convo.ask("Hi There! Nice to meet you. My Name is Buckley, What's yours?", (response, convo) => {
//     convo.say("Nice to meet you " + response.text + "!");
//     askLocation(response, convo);
//     convo.next();
//   });
// }

// let askLocation = (response, convo) => {
//   convo.ask("Where are you from?", (response, convo) => {
//     convo.say("I heard that " + response.text + " is a great place. Well I'll be here to help you out if you need me!")
//     convo.next();
//   });
// }

// connection.on('hello', (bot, message) => {
//   //message contains data sent by slack
//   //in this case -> https://api.slack.com/events/channel_joined
//   bot.reply(message, 'Openned');
// });

//make it a function and export buckley to controllers
//and check database if user exists
//if user doesn't exist, start this conversation 
// BUCKLEY.startPrivateConversation(
//   {user: 'U1YMCAKTM'}, (err, convo) => {
//   convo.say('It works...')
// });

export default BUCKLEY;




