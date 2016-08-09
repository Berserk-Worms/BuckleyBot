import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config();

const UNCLE = Botkit.slackbot({
  debug: false
});

UNCLE.spawn({
  //Create .env file in the root directory and add SLACK_BOT_TOKEN
  token: process.env.SLACK_BOT_TOKEN
}).startRTM();

UNCLE.hears("", ['direct_message'], function(bot, message) {
  console.log('replying to message');
  let responses = ["Yooo It's your boi JBuxxx, wats good?"]
  bot.startConversation(message, askFirstName);
});

let askFirstName = (response, convo) => {
  convo.ask("Yo dawg, it's yo boi JBuxXx, you tryna slide in my dm's? What does yo mama call you?", (response, convo) => {
    convo.say("Fo real? wat kinda name is " + response.text + ". She must not luv u");
    askLastName(response, convo);
    convo.next();
  })
}

let askLastName = (response, convo) => {
  convo.ask("Alright, with a terrible name like that you must have a good last name, what is it?", (response, convo) => {
    convo.say("Dangggg you really aint lucky, might need to go get that changed legally");
    askLocation(response, convo);
    convo.next();
  })
}

let askLocation = (response, convo) => {
  convo.ask("Ok so you got a turrible name but maybe you from a place where everyone has weird names, where you from?", (response, convo) => {
    convo.say("I heard " + response.text + " is dope, got some beautiful women over thur")
    convo.next();
  })
}

