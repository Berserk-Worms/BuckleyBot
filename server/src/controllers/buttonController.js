import Profile from '../models/profileModel';
import UserJob from '../models/userJobModel';
import User from '../models/userModel';
import Job from '../models/jobModel';

const test = (req, res) => {
  let parsed = JSON.parse(req.body.payload);
  // console.log(JSON.stringify(parsed.original_message));
  //receive a req.body with the below format
  // {
  //   payload: {
  //     actions: [{name: "yes", value: "yes"}],
  //     callback_id: '123',
  //     team: {
  //       id: 'someteamId',
  //       domain: 'teamname'
  //     },
  //     channel: {
  //       id: 'teamid',
  //       name: 'somechannel'
  //     },
  //     user: {
  //       id: 'someuserid',
  //       name: 'username'
  //     },
  //     action_ts: 'time in date.now',
  //     message_ts: 'time in date.now',
  //     attachment_id: '1',
  //     token: 'token for json',
  //     original_message: {
  //       //object with original info
  //     },
  //     response_url: 'https:\\/\\/hooks.slack.com\\/actions\\/T208LE2V9\\/69214087047\\/JbU5aJyPTMvWW5z2eHtCSFIg'
  //   }
  // }

  //upon the save button from the user
  //we should find the user, then append
  //to their user_jobs database

  //Need to ensure no duplicates
  //if already saved, need to ensure job doesn't display on userJobsListener
  //currently 
  User.find({
    where: { slackUserId: parsed.user.id }
  })
  .then((user) => {
    UserJob.findOrCreate({
      where: {
        userId: user.dataValues.id,
        jobId: `${parsed.actions[0].value}`
      }
    })
    .spread((userJob, created) => {
      created ? console.log('User saved job!') : console.log('User already has this job saved');
    })
    .catch((err) => {
      console.log('not nice')
    })

    res.json({
      type: "message",
      user: parsed.original_message.user,
      bot_id: parsed.original_message.bot_id,
      attachments: [
        {
          callback_id: "something else",
          text: parsed.original_message.attachments[0].text,
          title: parsed.original_message.attachments[0].title,
          actions: [
            {
              id: '1',
              name: "saved",
              text: "Saved!",
              type: "button",
              value: "saved",
              style: "primary"
            }
          ]
        }
      ]
    });
  })
  .catch(err => {
    res.send('Error')
  })

  // Profile.find({
  //   where: { id: 2 }
  // })
  // .then(profile => {
  //   //update database, 

  //   //we should send the original message
  //   //except with visual ques to show the 
  //   //job has been saved
  //   profile.updateAttributes({ location: 'earth' })
  //   res.send('Save jobs!');
  // })
  // .catch(err => {
  //   res.send('Error saving job.')
  // })
}

export default { test };