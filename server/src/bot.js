import Botkit from 'botkit';
import dotenv from 'dotenv';
import Team from './teams/teamModel';
import userJobsListener from './bots/job.js'

dotenv.config();

const store = {};

const connection = Botkit.slackbot({
  //this will make it possible to be interactive with
  //the convo.ask function
  // interactive_replies: true,
  debug: false
});

const teams = () => {
  Team.findAll()
    .then(teams => {
      for (let i = 0; i < teams.length; i++) {
        let data = teams[i].dataValues;
        let temp = connection.spawn({
          token: data.slackBotToken
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
    token: data.slackBotToken
  });

  store[data.slackTeamId] = temp;
  store[data.slackTeamId].startRTM();
}

//allow you to do RTM without having to create a new team
//note this is imported to server.js first
//then to teamModel (for hook afterCreate)
teams();

//Handle different bot listeners
connection.hears("jobs", ['direct_message'], function(bot, message) {
  userJobsListener.replyWithJobs(bot, message);
});

// const BUCKLEY = connection.spawn({
//   //Create .env file in the root directory and add SLACK_BOT_TOKEN
//   token: process.env.SLACK_BOT_TOKEN
// });

// BUCKLEY.startRTM();

connection.hears("", ['direct_message'], (bot, message) => {
  console.log('replying to message');
  // bot.startConversation(message, buttonTest);
});

/////////////////////////////////////////////////////////
//This section is for interactive buttons
// const buttonTest = (err, convo) => {
//   convo.ask({
//     attachments: [
//       {
//         title: 'Do you like my buttons?',
//         callback_id: '123',
//         attachment_type: 'default',
//         actions: [
//           {
//             "name": "yes",
//             "text": "Yes",
//             "value": "y",
//             "type": "button",
//           },
//           {
//             "name": "no",
//             "text": "No",
//             "value": "n",
//             "type": "button",
//           }
//         ]
//       }, [
//         {
//           pattern: "y",
//           callback: (reply, convo) => {
//             convo.say('FABULOUS!');
//             convo.next();
//             //do something such as send info to database
//           }
//         },  
//         {
//           pattern: "n",
//           callback: (reply, convo) => {
//             convo.say('Too bad.');
//             convo.next();
//           }
//         },
//         {
//           default: true,
//           callback: (reply, convo) => {
//             return;
//           }
//         }
//       ]
//     ]
//   });
// };

// const jobs = (response, convo) => {
//   convo.ask('Jobs Jobs Jobs Jobs Jobs', (response, convo) => {
//     convo.say('Is that all...?');
//     convo.next();
//   })
// }

// const no = (response, convo) => {
//   convo.ask('Alright, is that your final answer?', (response, convo) => {
//     convo.say(`That's too bad. Try again.`);
//     convo.next();
//   })
// }
/////////////////////////////////////////////////////////

export { store, teams, addTeamBot };




