import Botkit from 'botkit';
import dotenv from 'dotenv';
import Team from './models/teamModel';
import userJobsListener from './bots/job';
import helper from './bots/helper';

dotenv.config();

const store = {};

const connection = Botkit.slackbot({
  //this will make it possible to be interactive with
  //the convo.ask function
  interactive_replies: true,
  debug: false,
})

//allow you to do RTM without having to create a new team
//note this is imported to server.js first
//then to teamModel (for hook afterCreate)
const teams = () => {
  console.log('starting instances of bots in database')
  Team.findAll()
    .then(teams => {
      for (let i = 0; i < teams.length; i++) {
        let data = teams[i].dataValues;
        let temp = connection.spawn({
          token: data.slackBotToken,
          //add a retry to count to let the bot reconnect 
          //automatic retries are disabled by default
          retry: 20
        });
        //dangerous! slack team tokens....
        store[data.slackTeamId] = temp;
        store[data.slackTeamId].startRTM();

        // console.log(store[data.slackTeamId])
      }
      // console.log('this is the store of teams: ', store)
    });
}

const addTeamBot = (createdTeam) => {
  let data = createdTeam.dataValues;
  let temp = connection.spawn({
    token: data.slackBotToken,
    retry: 20
  });

  store[data.slackTeamId] = temp;
  store[data.slackTeamId].startRTM();
}

//Handle different bot listeners
connection.hears("jobs", ['direct_message'], function(bot, message) {
  console.log('this is the message, ', message )

  //this function continues to check if profile (name/location)
  //has been completed, in case the original websocket was closed
  //prior to completing onboarding
  helper.checkStage(bot, message);
  userJobsListener.replyWithJobs(bot, message);
});

// const BUCKLEY = connection.spawn({
//   //Create .env file in the root directory and add SLACK_BOT_TOKEN
//   token: process.env.SLACK_BOT_TOKEN
// });

// BUCKLEY.startRTM();

connection.hears("hello", ['direct_message'], (bot, message) => {
  console.log('replying to message');
  bot.reply(message, 'Great weather today huh?');
});

connection.on('rtm_open', (bot) => {
  console.log(`** The RTM api just opened at ${Date.now()}`);
})

connection.on('rtm_close', (bot) => {
  console.log(`** The RTM api just closed at ${Date.now()}`);
  //Need to determine if the retry or the bot.startRTM is reconnecting
  // bot.startRTM((err, bot, payload) => {
  //   if (err) {
  //     throw new Error('Could not connect to Slack');
  //   }
  // });
});

connection.on('rtm_reconnect_failed', (bot) => {
  console.log(`** The RTM api retry attempts have been exhausted at ${Date.now()}`);
})

/////////////////////////////////////////////////////////
//This section is for interactive buttons

connection.hears('interactive', 'direct_message', function(bot, message) {
  bot.reply(message, {
    attachments:[
      {
        title: 'Do you want to interact with my buttons?',
        callback_id: '123',
        attachment_type: 'default',
        actions: [
          {
            "name":"yes",
            "text": "Yes",
            "value": "some_data_for_yes",
            "type": "button",
            "style": "primary"
          },
          {
            "name":"no",
            "text": "No",
            "value": "some_data_for_no",
            "type": "button",
            "stype": "default"
          }
        ]
      }
    ]
  });
});


connection.on('interactive_message_callback', (bot, message) => {
  bot.replyInteractive(message, {
    text: '...',
    attachments: [
      {
        title: 'My buttons',
        callback_id: '123',
        attachment_type: 'default',
        actions: [
          {
            "name":"yes",
            "text": "Yes!",
            "value": "yes",
            "type": "button",
          },
          {
           "text": "No!",
            "name": "no",
            "value": "delete",
            "style": "danger",
            "type": "button",
            "confirm": {
              "title": "Are you sure?",
              "text": "This will do something!",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  });
});

const jobs = (response, convo) => {
  convo.ask('Jobs Jobs Jobs Jobs Jobs', (response, convo) => {
    convo.say('Is that all...?');
    convo.next();
  })
}

const no = (response, convo) => {
  convo.ask('Alright, is that your final answer?', (response, convo) => {
    convo.say(`That's too bad. Try again.`);
    convo.next();
  })
}
/////////////////////////////////////////////////////////

export { store, teams, addTeamBot, connection };




