import User from '../models/userModel';
import { store } from '../bot';
import { startConvo } from '../bots/introduction';

import { CronJob } from 'cron';

let jobCron = new CronJob({
  cronTime: '00 01 20 * * 1-5',
  onTick: () => {
    console.log('Cron jobs to dank jobs');
    messageUsers();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

let messageUsers = () => {
  User.findAll()
  .then(users =>{
    users.forEach(user => {
      const id = user.dataValues.slackUserId;
      const BUCKLEY = store[user.dataValues.slackTeamId];

      BUCKLEY.startPrivateConversation({ user: id }, (err, convo) => {
        convo.ask('Ready for this cron job?!?', (response, convo) => {
          convo.stop();
        });
      });
    });
  })
  .catch(err => {
    console.log('There was an error:', err);
  });
};

export default jobCron;