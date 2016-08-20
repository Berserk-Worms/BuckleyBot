import Team from '../models/teamModel';
import rp from 'request-promise';

// Triggered from 'GET /api/teams'
// Find all teams
const findAllTeams = (req, res) => {

  Team.findAll()
  .then(teams => res.send(teams))
  .catch(err => res.send('No teams were found', err));
  
}


// Triggered from 'GET /slack/teams/auth' after bot was added to team
// Queries Slack and adds Team to database
const addTeam = (req, res) => {
  let code = req.query.code;
  let options = {
    uri: 'https://slack.com/api/oauth.access',
    method:'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://localhost:8080/slack/teams/auth'
    },
    json: true
  }

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
      return Team.create(slackTeamData)
    }) 
    .then((team) => {
      findTeamUsers(team);
      res.redirect('/signin');
    })
    .catch((err) => {
      res.redirect('/oops') 
    });
} 

// Triggered from addTeam function
// Queries Slack for Team Users and makes request to user controller to create users
const findTeamUsers = (team) => {
  let teamUsersData = {
    uri: 'https://slack.com/api/users.list',
    method: 'GET',
    qs: { token: team.dataValues.slackBotToken }
  }

  rp(teamUsersData)
    .then(body => {
      body = JSON.parse(body);
      if (body.ok) {
        let users = parseUsersInfo(body.members);
        let usersData = { 
          url: 'http://localhost:8080/slack/users',
          method: 'POST',
          json: { users } 
        }
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
      return { 
        name: user.name,
        email: user.profile.email,
        photo: user.profile.image_192,
        slackUserId : user.id,
        slackTeamId: user.team_id
      };
    });
}

export default { findAllTeams, addTeam };