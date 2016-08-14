import Profile from '../models/profileModel';

const test = (req, res) => {
  let parsed = JSON.parse(req.body.payload);
  console.log('this is req body, ', parsed.original_message);
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

  Profile.find({
    where: { id: 2 }
  })
  .then(profile => {
    //update database, 

    //we should send the original message
    //except with visual ques to show the 
    //job has been saved
    profile.updateAttributes({ location: parsed.original_message.attachments[0].title})
    res.send('Save jobs!'
    //above is the original message modified
    );
  })
  .catch(err => {
    res.send('Error saving job.')
  })
}

export default { test };