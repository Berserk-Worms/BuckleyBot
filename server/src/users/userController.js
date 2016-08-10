import User from './userModel';
import Profile from '../profile/profileModel'
import rp from 'request-promise';

//some logic to query slack for slack_id and team_id
//need to register app to receive client id and client secret
let generateInfo = (token) => {

}

//auth user the first time they sign in with Slack
const authUser = (req, res) => {
  console.log('authenticating user!');
  //check for error (perhaps they declined to sign in)
  //if no error, extract code and swap for access token

  console.log('this is the req.query:', req.query);

  let options = {
    uri: 'https://slack.com/api/oauth.access',
    method:'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: 'http://localhost:8080/slack/users/auth'
    }
  }

  request(options)
    .then(body => {
      body = JSON.parse(body);

      if (body.ok) {
        console.log('response body', body);
        //TODO: refactor and make sure we aren't repeating ourselves
        let name = body.user.name;
        let accessToken = body.access_token;
        let slackUserId = body.user.id;
        let teamId = body.team.id;
        let email = body.user.email;

        User.findOrCreate({
          where: {name, accessToken, slackUserId, teamId, email}
        })
        .spread((user, create) => {
          created ? res.send('User created') : res.send('User already exists.');
        })
        .catch(err => res.send(err));
        // find or create user using access token and the info from body
      } else {
        //redirect to handle error
        console.log('Error: ', err);
      }

    })
    .catch(err => res.redirect('/'));

}

//we have a database of users based on slack bot interaction
//we should be able to find, addUser, deleteUser
const findUser = (req, res) => {
  User.findOne({
    where: {
      name: req.body.username,
      slackId: req.body.slack_id
    }
  })
  .then(user => {
    res.json(user);
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  });
};

//Adduser if not created, otherwise will return user info
const addUser = (req, res) => {
  let users = req.body.users;
  let teamId = req.body.teamId;
  let accessToken = null;

  users.forEach( ({ name, slackUserId, slackTeamId, email }) => {
    
    User.findOrCreate({
      where: { name, accessToken, slackUserId, slackTeamId, email, teamId }
    })
    .spread ((user, created) => {
      let userId = user.id;
      let name = user.name;
      let location = 'San Francisco';

      if(created) {
        console.log(user.name + ' added');
        Profile.findOrCreate({ where: { userId, name, location } })
          .spread((profile, created) => {
            created ? console.log('profile created') : console.log('profile already exists'); 
          })
          .catch(err => console.log(err));

      } else {
        console.log(user.name + ' exists');
      }

    })
    .catch(err => console.log(err));   

  });

}

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      name: req.body.username,
      slackUserId: req.body.slack_id
    }
  })
  .then(user => {
    console.log('deleted user: ', user);
    res.end()
  })
  .catch(err => {
    console.log('Error: ', err);
    done(err);
  })
}


export default { findUser, addUser, deleteUser, authUser };
