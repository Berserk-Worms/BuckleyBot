import db from '../db/db-config';
import Team from './teamModel';
import request from 'request';
import rp from 'request-promise';

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
    }
  }

  rp(options)
    .then((body) => {
      body = JSON.parse(body);
      let slackTeamData = {
        slackTeamToken: body.access_token,
        slackTeamName: body.team_name,
        slackTeamId: body.team_id,
        slackBotId: body.bot.bot_user_id,
        slackBotToken: body.bot.bot_access_token
      }

      if (body.ok) {
        Team.findOrCreate({ where : slackTeamData })
          .spread( (team, created) => {
            findTeamUsers(team);
            res.redirect('/');
          })
          .catch(err => {
            //TODO: redirect to error page due to bad data base request
            res.redirect('/');
          })
      } else {
        //TODO: redirect to error page due to failed respone request to slack
        res.redirect('/');
      }

    })  
    .catch(err => res.redirect('/') /* due to failed request to slack */ );

} 


const findTeamUsers = (team) => {
  let teamId = team.dataValues.id;
  let token = team.dataValues.slackBotToken;

  let usersData = {
    uri: 'https://slack.com/api/users.list',
    method: 'GET',
    qs: { token }
  }

  request(usersData, (err, response, body) => {
    body = JSON.parse(body);

    if (body.ok) {

      let users = body.members.filter((user) => {
        return user.is_bot === false && user.id !== 'USLACKBOT'
      })
      .map((user) => {
        return { 
          name: user.name,
          slackUserId : user.id, 
          slackTeamId: user.team_id,
          email: user.profile.email
        };
      });

      request({ 
        url: 'http://localhost:8080/slack/users',
        method: 'POST',
        json: { users, teamId } 
      }, (err, res, body) => {
        err ? console.log(err) : console.log(body);
      });

    } else {
      //TODO: redirect to error page
      res.redirect('/');
    }

  })
}

export default { addTeam };