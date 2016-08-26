import { store } from '../bot';
import helper from '../bots/helper';

//Init convo by accepting an argument of created Profile
const intro = (createdUser) => {
  let slackUserId = createdUser.dataValues.slackUserId;
  let slackTeamId = createdUser.dataValues.slackTeamId;
  
  const BUCKLEY = store[slackTeamId];

  BUCKLEY.startPrivateConversation({ user: slackUserId }, (err, convo) => {
    convo.ask("Hi I'm Buckley, I'm here to help you find the newest and most relevant jobs! Can I ask you some questions about your job search?", (response, convo) => {
      askLocation(response, convo);
      convo.next();
    });
  });
};

const askLocation = (response, convo) => {
  convo.ask("Awesome! Which city do you want to look for jobs in?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place! If you want to look for *jobs* ` +
      `just let me know! \nIf you have any questions, you can type *help* and I will be here to help you!`);
    helper.updateUser(response);
    convo.next();
  });
}

//TODO: when you delete the application from the slack/apps/manage
//there will be an abnormal socket close event, and it will attempt
//too reconnect three times

export default intro;