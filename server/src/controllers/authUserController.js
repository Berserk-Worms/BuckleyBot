import rp from 'request-promise';
import jwt from 'jwt-simple';

const server = 'http://localhost:8080';

// Triggered from 'GET /slack/users/auth' after bot was added to team
// Authenticate user when they click on "sign in with Slack" button
const checkAuthCode = (req, res) => {
  
  console.log('----- Checking authorization code sent by Slack! -----');
  if (req.query.code) {
    console.log('Received authorization code, will attempt to swap for access token.');
    authenticateUser(req, res);
  } else if (req.query.error) {
    console.log('User denied authorization. Error:', req.query.error);
    res.redirect('/oops');
  }

};

// Triggered from checkAuthCode
const authenticateUser = (req, res) => {

  let options = {
    uri: 'https://slack.com/api/oauth.access',
    method:'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: `${server}/slack/users/auth`
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  // Stupid closure variable that helps store body from the 1st .then block
  let userData = null;
  // Make request to Slack Authorization Server to swap auth code for access token
  console.log('----- Making Request to Slack -----');
  rp(options)
  .then(body => {
    if (body.ok) {
      userData = body;
      let slackTeamId = body.team.id;
      //Check for any team with the slack team id
      return rp(`${server}/api/teams/${slackTeamId}`);
    } else {
      console.log('Response body NOT OK. Error:', body.error);
      res.redirect('/');
    }
  })
  .then(team => {
    if (team !== null) {
      findOrCreateUser(userData, res);
    } else {
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
  console.log('----- Checking DB for user -----');

  let user = {
    name: body.user.name,
    email: body.user.email,
    photo: body.user.image_192,
    accessToken: body.access_token,
    slackUserId: body.user.id,
    slackTeamId: body.team.id,
  }

  let userPayload = { 
    url: `${server}/api/users/user`,
    method: 'POST',
    json: { user } 
  }

  rp(userPayload)
  .then(user => {
    let token = tokenForUser(user.slackUserId);
    res.redirect(`/?token=${token}`);
  })
  .catch(err => console.log(err));

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
    location: req.user.location
    // picture url
    // jobs
  }
  res.send(userData);
}

export default { checkAuthCode, getUserData }