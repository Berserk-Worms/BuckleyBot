import Team from '../models/teamModel';
import rp from 'request-promise';

// Triggered from 'GET /api/teams'
// Find all teams in teams table
const findAllTeams = (req, res) => {

  Team.findAll()
  .then(teams => res.send(teams))
  .catch(err => res.send('No teams were found', err));
  
}

// Triggered from 'POST /api/teams'
// Adds a team to the teams table
const addTeam = (req, res) => {
  let slackTeamData = req.body.slackTeamData;

  Team.findOrCreate({
    where: {
      slackTeamToken: slackTeamData.slackTeamToken,
      slackTeamName: slackTeamData.slackTeamName,
      slackTeamId: slackTeamData.slackTeamId,
      slackBotId: slackTeamData.slackBotId,
      slackBotToken: slackTeamData.slackBotToken
    }
  })
  .spread((team, created) => {
    created ? res.status(201).send(team) : res.status(200).send(team);
  })
  .catch(err => res.send(err));

}

export default { findAllTeams, addTeam };