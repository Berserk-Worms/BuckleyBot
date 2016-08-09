import db from '../db/db-config';
import Team from './TeamModel';
import request from 'request';


const addTeam = (req, res) => {

  console.log('this should show up twice if redirected');

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

  request(options, (err, res, body) => {
    console.log(body);
  });

} 

export default { addTeam };