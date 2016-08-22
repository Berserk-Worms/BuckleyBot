import { store } from '../bot';
import helper from '../bots/helper';
import rp from 'request-promise';

//Init convo by accepting an argument of created Profile
const intro = (createdUser) => {
  let slackUserId = createdUser.dataValues.slackUserId;
  let slackTeamId = createdUser.dataValues.slackTeamId;
  
  const BUCKLEY = store[slackTeamId];

  BUCKLEY.startPrivateConversation({ user: slackUserId }, (err, convo) => {
    convo.ask('Yoooo, watsup?!?', (response, convo) => {
      askLocation(response, convo);
      convo.next();
    });
  });
};

const askLocation = (response, convo) => {
  convo.ask("Awesome! Which *CITY* do you want to look for jobs?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place! If you want to look for *JOBS* ` +
      `just let me know! \nIf you have any questions, you can type *HELP* and I will be here to help you!`);
    helper.updateUser(response);
    convo.next();
  });
}

//TODO: when you delete the application from the slack/apps/manage
//there will be an abnormal socket close event, and it will attempt
//too reconnect three times

export default intro;