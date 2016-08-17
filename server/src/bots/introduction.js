import User from '../models/userModel';
import Profile from '../models/profileModel';
import { store } from '../bot';
import helper from '../bots/helper'

//Init convo by accepting an argument of created Profile
const intro = (createdProfile) => {
  User.find({
    where: {id: createdProfile.userId}
  })
  .then(user => {
    const id = user.dataValues.slackUserId;

    console.log(`----------\nthis is the userid: ${user.dataValues.id}, ` +
      `and the slackId: ${user.dataValues.slackUserId}\n----------`);

    // console.log('this is the user, ', user)
    const BUCKLEY = store[user.dataValues.slackTeamId];
    // console.log('this is buckley, ', BUCKLEY)

    BUCKLEY.startPrivateConversation({ user: id }, (err, convo) => {
      convo.ask('Yoooo, watsup?!?', (response, convo) => {
        askName(response, convo);
        convo.next();
      });
    });
  })
  .catch(err => {
    console.log('Error: ', err);
  })
};

//TODO: parse response.text before updating profile
const askName = (response, convo) => {
  convo.ask("Sweet! Nice to meet you. My Name is Buckley, What's yours?", (response, convo) => {
    console.log('This is the response: ', response);
    convo.say("Nice to meet you " + response.text + "!");
    helper.updateProfile(response, {name: response.text, stage: 'in-process'});
    askLocation(response, convo);
    convo.next();
  });
}

const askLocation = (response, convo) => {
  convo.ask("Where are you from?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place. ` +
      `Well I'll be here to help you out if you need me!`);
    helper.updateProfile(response, {location: response.text, stage: 'completed'})
    convo.next();
  });
}

//TODO: when you delete the application from the slack/apps/manage
//there will be an abnormal socket close event, and it will attempt
//too reconnect three times

export default intro;