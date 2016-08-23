import User from '../models/userModel';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import userJobsListener from '../bots/job';
import { store } from '../bot';
import { startConvo } from '../bots/introduction';
import { CronJob } from 'cron';
import Promise from 'bluebird';
import Sequelize from 'sequelize';

let jobCron = new CronJob({
  cronTime: '00 30 08 * * 1-5',
  // cronTime: '15 * * * * *',
  onTick: () => {
    console.log('Cron jobs to dank jobs');
    messageUsers();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

let messageUsers = () => {
  User.findAll({
    include: [{
      model: Tag,
      include: [Job]
    }]
  })
  .then(users => {
    users.forEach(user => {
      // console.log('this is the user,', JSON.stringify(user));
      let count ={};
      // console.log('cluster fuck. ', user.dataValues);
      let tagArr = user.dataValues.tags.map(item => {
        return item.name
      });
      const id = user.dataValues.slackUserId;
      const BUCKLEY = store[user.dataValues.slackTeamId];
      // console.log('this is the tagArr, ', tagArr);

      user.dataValues.tags.forEach(tag => {
        tag.jobs.forEach(job => {
          if (count[job.id]) { count[job.id]++; }
          else { count[job.id] = 1; }
        })
      })

      let keySort = Object.keys(count).sort((a, b) => { return count[b] - count[a]}).slice(0, 6);
      // console.log('this is the count,',  keySort);

      // console.log('userId keySort, ', user.slackUserId, keySort);
      if (keySort.length === 0) {
        BUCKLEY.startPrivateConversation({ user: user.slackUserId }, (err, convo) =>{
          convo.say(`It seems like you don't have any tags! Please type tags and set you filters!`);
          return;
        })
      } 

      return Job.findAll({
        where: { $or: [
          { id: keySort }
        ]}
      })
      .then(jobs => {
        console.log('this is the jobs!', jobs);
        let message_with_jobs = {
          text: 'Good morning! I found some cool jobs you might be interested in:',
          attachments: userJobsListener.returnJobSample(jobs, 5)
        };
        BUCKLEY.startPrivateConversation({ user: user.slackUserId }, (err, convo) => {
          convo.say(message_with_jobs);
        });
      })
    })
  })
  .catch(err => {
    console.log('There was an error:', err);
  });
};

export default jobCron;