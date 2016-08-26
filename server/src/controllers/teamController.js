import Team from '../models/teamModel';

// Triggered from 'GET /api/teams'
// Find all teams in teams table
const findAllTeams = (req, res) => {
  console.log('findallteams');
  Team.findAll()
  .then(teams => {
    console.log('in then, ', teams);
    res.send(teams)})
  .catch(err => res.send('No teams were found', err));
  
}

// Triggered from 'GET /api/teams:slackTeamId'
// Find a single team
const findTeam = (req, res) => {
  let slackTeamId = req.params.slackTeamId;

  Team.findOne({
    where: { slackTeamId }
  })
  .then(team => res.status(200).send(team))
  .catch(err => res.send('Error finding team', err))

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

export default { findAllTeams, findTeam, addTeam };