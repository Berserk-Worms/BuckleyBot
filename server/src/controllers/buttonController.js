import Profile from '../models/profileModel';
import UserJob from '../models/userJobModel';
import User from '../models/userModel';
import Job from '../models/jobModel';


//master dispatcher to check the callback_id of incoming requests
const buttonDispatcher = (req, res) => {
  let parsedPayload = JSON.parse(req.body.payload);

  //dispatch to the responsible function based on the callback_id
  if (parsedPayload.callback_id === 'clickSaveJobs') {
    saveJob(req, res, parsedPayload);
  }

  //BELOW is the format of incoming req.body//////////////////////////
  //
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
  ////////////////////////////////////////////////////////////////////
}

const saveJob = (req, res, data) => {
  //TODO: Also can add a button to show more jobs, instead of typing jobs again
  //Note: The job id is being passed into the value
  User.find({
    where: { slackUserId: data.user.id }
  })
  .then((user) => {

    let userJob = {
      userId: user.dataValues.id,
      jobId : `${data.actions[0].value}`
    }

    return UserJob.findOrCreate({ where: userJob })
  })
  .then(created => {
    console.log('Success');
    let reply_saved = {
      type: 'message',
      text: 'Some Jobs',
      attachments: data.original_message.attachments
    }
    let clickedInt = `${parseInt(data.attachment_id, 10) - 1}`;

    //Functions to change the button text and color
    //Note: 1st array is the attachment, 2nd is the button
    reply_saved.attachments[clickedInt].actions[0].text = 'Saved!';
    reply_saved.attachments[clickedInt].actions[0].style = 'primary';
    //give it a new callback_id so it wont make a slack button interaction
    reply_saved.attachments[clickedInt].callback_id = 'something else';

    res.json(reply_saved);
  })
  .catch(err => {
    console.log('Error saving data');
  })

    //BELOW is a return format required to look exactly the same////////
    //Except for the button, which changes to a green Saved! button
    //
    // res.json({
    //   type: "message",
    //   // user: parsed.original_message.user,
    //   // bot_id: parsed.original_message.bot_id,
    //   attachments: [
    //     {
    //       callback_id: "something else",
    //       text: parsed.original_message.attachments[0].text,
    //       title: parsed.original_message.attachments[0].title,
    //       actions: [
    //         {
    //           id: '1',
    //           name: "saved",
    //           text: "Saved!",
    //           type: "button",
    //           value: "saved",
    //           style: "primary"
    //         }
    //       ]
    //     }
    //   ]
    // });
    ////////////////////////////////////////////////////////////////////
}

export default { buttonDispatcher };