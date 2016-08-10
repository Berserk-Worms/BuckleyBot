import User from '../users/userModel';
import Profile from '../profile/profileModel';
import profileController from '../profile/profileController';
import BUCKLEY from '../bot';

//When the user has been created, invoke the function that is
//generated from here

const intro = (createdUser) => {
  User.findAll({
    where: {id: createdUser.userId}
  })
  .then(user => {
    console.log('this is the userid, ', user[0].dataValues.slackUserId);
    //start convo
    let id = user[0].dataValues.slackUserId;

    BUCKLEY.startPrivateConversation({user: id}, (err, convo) => {
      convo.say('Yoooo, watsup?!?')
    });
  })
  //do a catch for errors
};

const askName = (response, convo) => {
  convo.ask("Hi There! Nice to meet you. My Name is Buckley, What's yours?", (response, convo) => {
    convo.say("Nice to meet you " + response.text + "!");
    //send the response and update profile
    let name = response.text;

    Profile.find({
      where: {userId: created.userId}
    })
    .then(profile => {
      profile.updateAttributes({name})
        .then(() => {
          console.log('Profile has been updated');
        })
    })
  })
}

export default intro;