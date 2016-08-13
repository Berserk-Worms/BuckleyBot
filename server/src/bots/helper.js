import { connection } from '../bot.js';
import User from '../users/userModel';
import Team from '../teams/teamModel';
import Profile from '../profile/profileModel';
import { updateProfile } from '../bots/introduction';

//we want to check if the user on the team has been
//onboard with introduction or not, in this case
//we can check if the profile column is at 
//stage: null -> no name or location update
//stage: in-process -> name update but no location
//stage: completed -> name and location updated

const helper =  {
  checkStage: (bot, message) => {
    //Want to shorten code below,
    //however, when using eager loading for user (extend profile)
    //receive an error that profile is not associated to the user
    User.find({
      where: { slackUserId: message.user }
    })
    .then(user => {
      let userId = user.dataValues.id;
      Profile.find({
        where: { userId }
      })
      .then(profile => {
        console.log('this is inside helper.checkstage, profile: ', profile.dataValues);
        let stage = profile.dataValues.stage;
        //depending on the stage, would have to give different respones
        routeOnStage(stage, bot, message);
      })
      .catch(err => {
        console.log('Error with checking profile');
      })
    })
    .catch(err => {
      console.log('Error with checking users');
    })
  },
  updateProfile: (response, profilePayload) => {
    console.log('this is the response: ', response)
    User.find({
      where: {slackUserId: response.user}
    })
    .then(user => {
      let userId = user.dataValues.id;
      Profile.find({
        where: { userId }
      })
      .then(profile => {
        profile.updateAttributes(profilePayload)
          .then(() => console.log('Profile has been updated!'))
          .catch(() => console.log('Could not update profile.'))
      })
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
  bot.reply(message, `Below are some jobs you might be interested in!`)
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