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

  request(options, (err, response, body) => {
    body = JSON.parse(body);

    if (body.ok) {
      // save team to database
      // redirect to success page
      res.redirect('/');
    } else {
      //redirect to handle error
    }
    
  });

} 

export default { addTeam };