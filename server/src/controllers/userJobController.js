//whenever the user clicks save on a job
//save the user primary id and job primary id
//inside of the User_Jobs table
import UserJob from '../models/userJobModel';

const deleteUserJob = (req, res) => {

  if (req.error) {
    console.log('Error getting user data:', error);
    res.send(req.error);
  } 

  UserJob.find({
    where: {
      slackUserId: req.user.slackUserId,
      jobId: req.params.jobId
    }
  })
  .then(userJob => {
    console.log(`Deleted User Id: ${userJob.dataValues.userId}, JobId: ${userJob.dataValues.jobId}`)
    return userJob.destroy();
  })
  .then(() => res.send('Deleted Successfully'))
  .catch(err => console.log('Error destrying user tag: ', err));

};

const getUserJobs = (req, res) => {
  let slackUserId = req.params.slackUserId;
  console.log('inside getUserJobs!!!!!', slackUserId);
  UserJob.findAll({
    where: { slackUserId }
  })
  .then(userJob => res.status(200).send(userJob))
  .catch(err => res.status(500).send(err))
}

export default { deleteUserJob, getUserJobs }