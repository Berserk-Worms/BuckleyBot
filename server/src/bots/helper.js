import { connection } from '../bot.js';
import User from '../models/userModel';
import Team from '../models/teamModel';
import Tag from '../models/tagModel';
import { updateProfile } from './introduction';
import rp from 'request-promise';

//we want to check if the user on the team has been
//onboard with introduction or not, in this case
//we can check if the profile column is at 
//stage: null -> no name or location update
//stage: in-process -> name update but no location
//stage: completed -> name and location updated

const helper =  {
  updateUser: (response) => {
    let slackUserId = response.user;
    let location = response.text;
    let usersData = { 
      url: 'http://localhost:8080/slack/users',
      method: 'PUT',
      json: { slackUserId, location } 
    }
    
    rp(usersData)
      .catch(err => console.log(err))

  },
  findTags: (message) => {
    //given a string of text, split the string by spaces
    //loop through the array and check if the tag exists
    //for now we will not consider new tags that the users 
    //want to add 

    //with splitting, how would be handle .js
    let words = message.text.split(/[\\.,\\ !;?:]/);
    let match = [];

    return Tag.findAll()
    .then(tags => {

      tags.forEach(item => {
        if (words.indexOf(item.dataValues.name) !== -1) {
          match.push(item.dataValues.name)
        }
      })
  
      console.log('this is match, ', match);
      return match;
    })
    .catch(err => {
      console.log('Error: ', err);
    })

  }
};

const routeOnStage = (currStage, bot, message) => {
  if (currStage === 'completed') {
    completedReply(bot, message);
  } else if (currStage === 'in-process') {
    inProcessReply(bot, message);
  } else if (currStage === null) {
    incompleteReply(bot, message);
  }
}

const completedReply = (bot, message) => {
  bot.reply(message, `Below are some jobs you might be interested in! ` +
    `Let me know if you need anything else!`);
};

const inProcessReply = (bot, message) => {
  bot.startPrivateConversation({ user: message.user }, (err, convo) => {
    convo.ask(`I have found a list of jobs for you! However, ` +
      `it seems like I do not have you location yet ಠ_ಠ \n` +
      `Can you tell me where you are from?`, (response, convo) => {
      
      console.log(response);

      convo.say(`I heard that ${response.text} is a great place. ` + 
        `Well, I'll be here to help you out if you need me!`);
      helper.updateProfile(response, { location: response.text, stage: 'completed' })
      convo.next();
    });
  });
};

const incompleteReply = (bot, message) => {
  bot.startPrivateConversation({ user: message.user }, (err, convo) => {
    convo.ask(`Hey there! I have found a list of jobs for you! ` + 
      `However, it seems like I don't have your name or location ヽ(￣д￣;)ノ \n` +
      `What's your name?`, (response, convo) => {
      
      console.log(response);

      convo.say(`Nice to meet you ${response.text} !`);
      helper.updateProfile(response, { name: response.text, stage: 'in-process' })
      followUp(response, convo);
      convo.next();
    });
  });
}

const followUp = (response, convo) => {
  convo.ask(`Can you tell me where you are from?`, (response, convo) => {
    
    console.log(response);

    convo.say(`I heard that ${response.text} is a great place. ` + 
      `Well, I'll be here to help you out if you need me!`);
    helper.updateProfile(response, { location: response.text, stage: 'completed' })
    convo.next();
  });
}


export default helper;