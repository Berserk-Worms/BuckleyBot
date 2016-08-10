import User from '../users/userModel';
import Profile from '../profile/profileModel';
import BUCKLEY from '../bot.js';

//Init convo by accepting an argument of created Profile
const intro = (createdProfile) => {
  User.find({
    where: {id: createdProfile.userId}
  })
  .then(user => {
    let id = user.dataValues.slackUserId;
    //console logs
    console.log(`----------\nthis is the userid: ${user.dataValues.id}, ` +
      `and the slackId: ${user.dataValues.slackUserId}\n----------`);

    BUCKLEY.startPrivateConversation(
      //hard coded for testing
      // {user: 'U1YMCAKTM'}, 
      {user: id},
      (err, convo) => {
      convo.ask('Yoooo, watsup?!?', (response, convo) => {
        askName(response, convo);
        convo.next();
      });
    });
  });
  //do a catch for errors
};

const askName = (response, convo) => {
  convo.ask("Sweet! Nice to meet you. My Name is Buckley, What's yours?", (response, convo) => {
    console.log('This is the response: ', response);
    convo.say("Nice to meet you " + response.text + "!");
    updateProfile(response, {name: response.text});
    askLocation(response, convo);
    convo.next();
  });
}

const askLocation = (response, convo) => {
  convo.ask("Where are you from?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place.` +
      `Well I'll be here to help you out if you need me!`);
    updateProfile(response, {location: response.text})
    convo.next();
  });
}

const updateProfile = (response, profilePayload) => {
  User.find({
    where: {slackUserId: response.user}
  })
  .then(user => {
    Profile.find({
      where: {userId: user.id}
    })
    .then(profile => {
      profile.updateAttributes(profilePayload)
        .then(() => console.log('Profile has been updated!'))
        .catch(() => console.log('Could not update profile.'));
    });
  });
}

export default intro;