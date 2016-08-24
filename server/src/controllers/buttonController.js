import UserJob from '../models/userJobModel';
import User from '../models/userModel';
import Job from '../models/jobModel';
import botHelper from '../bots/helper';
import { connection, store } from '../bot';
import rp from 'request-promise';

//master dispatcher to check the callback_id of incoming requests
const buttonDispatcher = (req, res) => {
  let parsedPayload = JSON.parse(req.body.payload);

  //dispatch to the responsible function based on the callback_id
  if (parsedPayload.callback_id === 'clickSaveJobs') {
    saveJob(req, res, parsedPayload);
  } else if (parsedPayload.callback_id === 'location') {
    locationButtons(req, res, parsedPayload);
  } else if (parsedPayload.callback_id === 'userTag' && parsedPayload.actions[0].name === 'deleteTag') {
    console.log('============ DELETE ============')
    deleteUserTag(req, res, parsedPayload);
  } else if (parsedPayload.callback_id === 'userTag' && parsedPayload.actions[0].name === 'addTag') {
    console.log('============ ADD ============');
    addUserTag(req, res, parsedPayload);
  } else {
    res.end();
  }

  //BELOW is the format of incoming req.body//////////////////////////
  //Note req.body.payload is stringified JSON
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
      slackUserId: user.dataValues.slackUserId,
      jobId : `${data.actions[0].value}`
    }
    return UserJob.findOrCreate({ where: userJob })
  })
  .then(created => {    
    let reply = buttonUpdater(data, "Saved!", 0, 'primary', 'something else');

    res.json(reply);
  })
  .catch(err => {
    console.log('Error saving data,', err);
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

const locationButtons = (req, res, data) => {
  let id = data.user.id;
  let teamId = data.team.id;

  User.find({
    where: { slackUserId: data.user.id }
  })
  .then(user => {
    console.log(user.dataValues);
    let location = user.dataValues.location;
    let reply;
    //if button clicked was view, send a direct message 
    //to the user with user location, and change the button to clicked!
    if (data.actions[0].value === 'view') {
      reply = {
        type: 'message',
        text: data.original_message.text,
        attachments: [
          {
            text: `Your current search loation is:\n ${location}`,
            callback_id: 'something else',
            color: `#3AA3E3`,
            attachment_type: `default`
          }
        ]
      };
      res.json(reply);
    } else {
      //if the button clicked was update, update the location
      //and notify user the location was updated!
      reply = buttonUpdater(data, "Update", 1, 'primary', 'something else');
      reply.attachments[0].text = 'Respond to Buckleybot to update search location',
      // bot asks user where they want to change location
      store[teamId].startPrivateConversation({ user: id }, (err, convo) => {
        convo.ask("Where do you want to change your job search location to?", (response, convo) => {
          botHelper.updateUser(response);
          convo.say(`Great, your location has been updated to ${response.text}!`);
          convo.next();
        });
      });
      botHelper.updateUser({ user: id, location });

      res.json(reply);
    }
  });
};

const deleteUserTag = (req, res, data) => {
  let clickedInt = `${parseInt(data.attachment_id, 10) - 1}`;

  let userTagData = {
    url: `${process.env.URI}/api/users/tags/${data.user.id}/${data.actions[0].value}`,
    method: `DELETE`
  }

  let reply = buttonUpdater(data, 'Add Tag', 0, 'primary', 'userTag');
  //update the button name to 'addTag'
  //remove the confirm functionality
  reply.attachments[clickedInt].actions[0].name = 'addTag';
  delete reply.attachments[clickedInt].actions[0].confirm;

  rp(userTagData)
  .then(success => console.log('Success deleting user tag!', success))
  .catch(err => console.log('Error deleting user tag: ', err));

  res.status(200).json(reply);
};

const addUserTag = (req, res, data) => {
  let clickedInt = `${parseInt(data.attachment_id, 10) - 1}`;

  let slackUserId = data.user.id;
  let tagId = data.actions[0].value;

  console.log('addusertag: ', slackUserId, tagId);

  let userTagData = {
    url: `${process.env.URI}/api/users/tags`,
    method: `POST`,
    json: { slackUserId, tagId }
  };

  let reply = buttonUpdater(data, 'Delete Tag', 0, 'danger', 'userTag');
  //update the button name to 'deleteTag'
  //add a confirm
  reply.attachments[clickedInt].actions[0].name = 'deleteTag';
  reply.attachments[clickedInt].actions[0].confirm = {
    title: `Are you sure?`,
    text: `Confirmation to delete tag?`,
    ok_text: `Yes, delete it!`,
    dismiss_text: `No, don't delete!`
  };

  rp(userTagData)
  .then(success => console.log('Success adding user tag: ', success))
  .catch(err => console.log('Error adding user tags: ', err));

  res.status(200).json(reply);
}

const buttonUpdater = (data, buttonText, buttonInt, buttonStyle, callbackId) => {
  let message = {
    type: 'message',
    text: data.original_message.text,
    attachments: data.original_message.attachments
  };
  let clickedInt = `${parseInt(data.attachment_id, 10) - 1}`;
  
  if (buttonInt === undefined) {
    buttonInt = 0;
  }
  //Functions to change the button text and color
  //Note: 1st array is the attachment, 2nd is the button
  message.attachments[clickedInt].actions[buttonInt].text = buttonText;
  message.attachments[clickedInt].actions[buttonInt].style = buttonStyle;
  //give it a new callback_id so it wont make a slack button interaction
  message.attachments[clickedInt].callback_id = callbackId;

  return message;
}

export default { buttonDispatcher };