import { store } from '../bot';
import helper from '../bots/helper';
import _ from 'underscore';

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
  convo.ask("Awesome! Which _CITY_ do you want to look for jobs?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place! `);
    helper.updateUser(response);
    checkTag(response, convo);
    convo.next();
  });
}

const checkTag = (response, convo) => {

  helper.listAllTags()
  .then(allTags => {
    //find all user tags
    helper.listUserTags(response)
    .then(res => {
      //all user tags
      let userTagObj = {}; 
      _.each(res, item => {
        userTagObj[item.tagId] = true
      });

      let attachments = [];

      //how can i loop through the user tags
      //if the user has the tag, have a delete button
      //otherwise, have a button to add

      allTags.forEach(({id, name}) => {
        let addButton =  {
          name: `addTag`,
          text: `Add Tag`,
          value: id,
          type: `button`,
          style: `primary`
        }; 
        let deleteButton = {
          name: `deleteTag`, 
          text: `Delete Tag`, 
          value: id, 
          type: `button`, 
          style: `danger`,
          confirm: {
            title: `Are you sure?`,
            text: `Confirmation to delete tag?`,
            ok_text: `Yes, delete it!`,
            dismiss_text: `No, don't delete!`
          } 
        };
        
        //does tag(user tag) exist in tags(tag table)
        let button = (!!userTagObj[id]) ? deleteButton : addButton;
            
        let attachment = {
          text: `${name}`,
          callback_id: `userTag`,
          fallback: `This option is disabled`,
          attachment_type: `default`,
          color: `#3AA3E3`,
          actions: [button]
        };
        attachments.push(attachment);
      });

      let response = {
        text: `Here are some tags you can filter by: `,
        fallback: `Unable to show tags`,
        color: `#3AA3E3`,
        attachments
      };
      convo.say(response);
    });
  });
  closeIntro(response, convo);
  convo.next();
}

const closeIntro = (response, convo) => {
  convo.say(`If you want to look for *jobs* ` +
    `just let me know! \nIf you have any questions, you can type *help* and I will be here to help you!`)
}

//TODO: when you delete the application from the slack/apps/manage
//there will be an abnormal socket close event, and it will attempt
//too reconnect three times

export default intro;