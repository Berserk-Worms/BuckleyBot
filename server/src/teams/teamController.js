import db from '../db/db-config';
import Team from './teamModel';
import request from 'request';


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

  request(options, (err, response, body) => {
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
          res.redirect('/');
        })
        .catch(err => {
          //TODO: redirect to error page
          res.redirect('/');
        })

    } else {
      //TODO: redirect to error page
      res.redirect('/');
    }

  });

} 

export default { addTeam };