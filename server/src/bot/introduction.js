import User from '../users/userModel';
import Profile from '../profile/profileModel';
import BUCKLEY from '../bot';

//Init convo by accepting an argument of created Profile
const intro = (createdProfile) => {
  User.findAll({
    where: {id: createdProfile.userId}
  })
  .then(user => {
    console.log(`----------\nthis is the userid: ${user[0].dataValues.id}, ` +
      `and the slackId: ${user[0].dataValues.slackUserId}\n----------`);

    let id = user[0].dataValues.slackUserId;

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
    update(response, {name: response.text});
    askLocation(response, convo);
    convo.next();
  });
}

const askLocation = (response, convo) => {
  convo.ask("Where are you from?", (response, convo) => {
    convo.say(`I heard that ${response.text} is a great place.` +
      `Well I'll be here to help you out if you need me!`);
    update(response, {location: response.text})
    convo.next();
  });
}

const update = (response, kvPair) => {
  User.find({
    where: {slackUserId: response.user}
  })
  .then(user => {
    Profile.find({
      where: {userId: user.id}
    })
    .then(profile => {
      profile.updateAttributes(kvPair)
        .then(() => console.log('Profile has been updated!'))
        .catch(() => console.log('Could not update profile.'));
    });
  });
}

export default intro;