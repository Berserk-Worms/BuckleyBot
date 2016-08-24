import rp from 'request-promise';

const server = 'http://localhost:8080';

// Triggered from 'GET /slack/teams/auth' after bot was added to team
// Queries Slack and makes a request to teamcontroller to add team
const authTeam = (req, res) => {
  let options = {
    uri: 'https://slack.com/api/oauth.access',
    method:'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: `${server}/slack/teams/auth`
    },
    json: true
  }

  console.log('----- Making Request to Slack -----');
  rp(options)
  .then((body) => {
    if (body.ok) {
      let slackTeamData = {
        slackTeamToken: body.access_token,
        slackTeamName: body.team_name,
        slackTeamId: body.team_id,
        slackBotId: body.bot.bot_user_id,
        slackBotToken: body.bot.bot_access_token
      }
      return slackTeamData;
    } else {
      res.redirect('/oops');
    }
  })
  .then((slackTeamData) => {
    let teamData = { 
      url: `${server}/api/teams`,
      method: 'POST',
      json: { slackTeamData } 
    }
    console.log('----- Making Request to /api/teams -----');
    return rp(teamData);
  }) 
  .then((team) => {
    findTeamUsers(team);
    res.redirect('/signin');
  })
  .catch((err) => {
    res.redirect('/oops') 
  });

}

// Triggered from authTeam function
// Queries Slack for Team Users and makes request to user controller to create users
const findTeamUsers = (team) => {
  let teamUsersData = {
    uri: 'https://slack.com/api/users.list',
    method: 'GET',
    qs: { token: team.slackBotToken },
    json: true
  }

  console.log('----- Making Request to Slack -----');
  rp(teamUsersData)
  .then(body => {
    if (body.ok) {
      let users = parseUsersInfo(body.members);
      let usersData = { 
        url: `${server}/api/users`,
        method: 'POST',
        json: { users } 
      }
      console.log('----- Making Request to /api/users -----');
      return rp(usersData);
    } else {
      res.redirect('/oops');
    }
  }) 
  .catch((err) => {
    res.redirect('/oops');
  });
}

// Triggered from findTeamUsers
// Helper function to parse relevant User data from Slack
// NOTE: Slack bot is considered a user so it needed to be omitted
const parseUsersInfo = (users) => {
  return users.filter((user) => user.is_bot === false && user.id !== 'USLACKBOT')
    .map((user) => {
      console.log(user);
      return { 
        name: user.real_name,
        email: user.profile.email,
        photo: user.profile.image_192,
        slackUserId : user.id,
        slackTeamId: user.team_id
      };
    });
}

export default { authTeam };