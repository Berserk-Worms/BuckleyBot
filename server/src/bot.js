import Botkit from 'botkit';
import dotenv from 'dotenv';
import userJobsListener from './bots/job';
import helper from './bots/helper';
import rp from 'request-promise';
import _ from 'underscore';

dotenv.config();

const store = {};
const server = 'http://localhost:8080';

const connection = Botkit.slackbot({
  //this will make it possible to be interactive with
  //the convo.ask function
  interactive_replies: true,
  debug: false,
});


//Spawn a bot connection for a specific team
const spawnBot = (team) => {
  let temp = connection.spawn({
    token: team.slackBotToken,
    retry: 20
  });
  store[team.slackTeamId] = temp.startRTM();
};

//allow you to do RTM without having to create a new team
//note this is imported to server.js first on server start
const teams = () => {
  console.log('starting instances of bots in database')
  rp({
    url: `${server}/api/teams`,
    json: true
  })
  .then((teams) => {
    teams.forEach((team) => {
      console.log('spanwing bot for', team.slackTeamName);
      spawnBot(team);
    });
  })
  .catch((err) => {
    console.log('Error fetching all teams from /api/teams', err);
  });
};

const addTeamBot = (createdTeam) => {
  spawnBot(createdTeam);
};

//Adding key words bot responds to (hears) and event listeners (on)
//Handle different bot listeners
connection.hears(["jobs", "job"], ['direct_message'], function(bot, message) {
  userJobsListener.replyWithJobs(bot, message);
});

connection.hears(["change", "update"], ['direct_message'], function(bot, message) {
  bot.startConversation(message, (err, convo) => {
    convo.ask("Where do you want to change your job search location to?", (response, convo) => {
      askLocation(response,convo);
      convo.next();
    });
  });
});

const askLocation = (response, convo) => {
  helper.updateUser(response);
  convo.say(`Great, your location has been updated to ${response.text}!`);
  convo.next();
}

connection.hears("tag", ['direct_message'], (bot, message) => {
  bot.startConversation(message, (err, convo) => {
    convo.ask(`I heard someone say tag!`, (response, convo) => {
      respondWithTags(response, convo);
      convo.next();
    });
  });
});

const respondWithTags = (response, convo) => {
  //find all tags
  helper.listAllTags()
  .then(allTags => {
    let tags = _.map(JSON.parse(allTags), item => {
      return item.name;
    });
    //find all user tags
    helper.listUserTags(response)
    .then(res => {
      //all user tags
      let userTag = _.map(JSON.parse(res), item => {
        return item.tagId;
      });
      let attachments = [];

      //how can i loop through the user tags
      //if the user has the tag, have a delete button
      //otherwise, have a button to add

      tags.forEach(tag => {
        let addButton =  {
          name: `addTag`,
          text: `Add Tag`,
          value: tag,
          type: `button`,
          style: `primary`
        }; 
        let deleteButton = {
          name: `deleteTag`, 
          text: `Delete Tag`, 
          value: tag, 
          type: `button`, 
          style: `danger`,
          confirm: {
            title: `Are you sure?`,
            text: `Confirmation to delete tag?`,
            ok_text: `Yes, delete it!`,
            dismiss_text: `No, don't delete!`
          } 
        };
        //does tag(user tag) exist in tags(tag table)
        let button = (userTag.indexOf(tag) !== -1) ? deleteButton : addButton;
            
        let attachment = {
          text: `${tag}`,
          callback_id: `userTag`,
          attachment_type: `default`,
          color: `#3AA3E3`,
          actions: [button]
        };
        attachments.push(attachment);
      });

      let message = {
        text: `Here are a list of your tags: `,
        fallback: `Unable to show tags`,
        color: `#3AA3E3`,
        attachments: attachments
      };

      convo.say(message);
      convo.next();
    });
  });
};

connection.hears("location", ['direct_message'], (bot, message) => {
  bot.reply(message, { 
    text: `Would you like to *view* or *update* your current job search location?`,
    attachments: [
      {
        text: `Choose to view or update`,
        fallback: `You are unable to choose`,
        callback_id: `location`,
        color: `#3AA3E3`,
        attachment_type: `default`,
        actions: [
          {
            name: `view`,
            text: `View`,
            type: `button`,
            value: `view`
          },
          {
            name: `update`,
            text: `Update`,
            type: `button`,
            value: `update`
          }
        ]
      }
    ]
  });
});

connection.hears("weather", ['direct_message'], (bot, message) => {
  console.log('replying to message');
  bot.reply(message, 'Great weather today huh?');
});

connection.hears("", ['direct_message'], (bot, message) => {
  bot.reply(message, `I didn't quite get that. Try asking me about jobs!`);
});

connection.on('rtm_open', (bot) => {
  console.log(`** The RTM api just opened at ${Date.now()}`);
});

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
});

export { store, teams, addTeamBot, connection };




