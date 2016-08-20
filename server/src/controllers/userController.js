import User from '../models/userModel';
import Team from '../models/teamModel';
import rp from 'request-promise';
import jwt from 'jwt-simple';

// TODO: This method could be moved into a different module that deals
// purely with slack oauth. This doesn't necessarily need to live in
// the userController module.
// Triggered from 'GET /slack/users/auth' after bot was added to team
// Authenticate user when they click on "sign in with Slack" button
const checkAuthCode = (req, res) => {
  console.log('-------------- Checking authorization code sent by Slack!');
  console.log('This is the req.query object:', req.query);

  if (req.query.code) {
    console.log('Received authorization code, will attempt to swap for access token.');
    authenticateUser(req, res);
  } else if (req.query.error) {
    console.log('User denied authorization. Error:', req.query.error);
    // TODO: show an error here that tells the user that they need to
    // authorize slackbot in order for it to be added on Slack
    res.redirect('/oops');
  }
};

// Triggered from checkAuthCode
const authenticateUser = (req, res) => {
  console.log('-------------- Authenticating user!')

  let options = {
    uri: 'https://slack.com/api/oauth.access',
    method:'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: 'http://localhost:8080/slack/users/auth'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  // Stupid closure variable that helps store body from the 1st .then block
  let userData = null;
  // Make request to Slack Authorization Server to swap
  // auth code for access token
  rp(options)
  .then(body => {
    console.log('response body', body);
    if (body.ok) {
      //Check for any team with the slack team id -- if this exists, find or create user
      userData = body;
      return Team.findOne({ where: { slackTeamId: body.team.id} });
    } else {
      console.log('Response body NOT OK. Error:', body.error);
      res.redirect('/');
    }
  })
  .then(team => {
    if (team !== null) {
      findOrCreateUser(userData, res);
    } else {
      // TODO: implement this with front end /oops page
      // this is where we handle a user that signs in but their team
      // has not yet installed bot to their slack
      console.log('Team needs to add uncle bot first!');
      res.redirect('/oops');
    }
  })
  .catch(err => {
    console.log('There was an error with the GET request:', err)
    res.redirect('/')
  });
}

// Triggered from authenticated user
const findOrCreateUser = (body, res) => {
  console.log('-------------- Checking DB for user!');
  // find or create user using access token and the info from body
  let name = body.user.name;
  let accessToken = body.access_token;
  let slackUserId = body.user.id;
  let slackTeamId = body.team.id;
  let email = body.user.email;

  User.findOrCreate({
    where: { name, slackUserId, slackTeamId, email }
  })
  .spread((user, created) => {
    console.log('Created user?', created);
    user.updateAttributes({ accessToken });
    // TODO: issue the JWT
    // TODO: and store it in the client
    // QUESTION: how do we send it to the client?
    // Create JWT
    let token = tokenForUser(slackUserId);
    // TODO: This feels like jank, there must be a better way to send token with a redirect:
    res.redirect(`/?token=${token}`);
  })
  .catch(err => res.send(err));
};

// Triggered from findOrCreateUser
const tokenForUser = (slackUserId) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: slackUserId, iat: timestamp }, process.env.JWT_SECRET);
};

// Triggered from 'GET /slack/users/data' after passport middleware finds user
const getUserData = (req, res) => {
  // Check if error
  if (req.error) {
    console.log('Error getting user data:', error);
    res.send(req.error);
  }
  // Otherwise, send the relevant user data as an object
  let userData = {
    name: req.user.name,
    email: req.user.email,
    // picture url
    // jobs
  }
  res.send(userData);
}

// Trigger from 'GET /slack/users:slackUserId'
// Query for single user
const findUser = (req, res) => {
  let slackUserId = req.params.slackUserId;

  User.findOne( {where: {slackUserId}} )
  .then(user => res.send(user))
  .catch(err => res.send('No user found: ', err));

}
 
// Triggered from 'POST /slack/users'
// Create user and make request to profile controller
// NOTE: users need to be passed as a array even if it's a single user
// NOTE: accessToken is set to null until user signs in
// NOTE: location is set to San Francisco for default 
const addUsers = (req, res) => {
  let users = req.body.users;
  let teamId = req.body.teamId;
  let accessToken = null;
  let location = 'San Francisco';

  Promise.all(users.map( ({ name, email, photo, slackUserId, slackTeamId }) => {
    return User.create({
      name, email, location, photo, accessToken, slackUserId, slackTeamId 
    })
  }))
  .then((users) => res.send(users))
  .catch(err => res.send(err) )
  .catch((err) => res.send('Error adding user', err));  
}

// Triggred from 'PUT /slack/users' 
// Updates location when an user interacts with the bot
const updateLocation = (req, res) => {
  let slackUserId = req.body.slackUserId;
  let location = req.body.location;

  User.findOne({
    where: { slackUserId }
  })
  .then(user => {
    user.updateAttributes({ location });
    res.send('User location updated')
  })
  .catch(err => res.send('Error when updating location', err))
}


export default { findUser, addUsers, updateLocation, checkAuthCode, getUserData };
