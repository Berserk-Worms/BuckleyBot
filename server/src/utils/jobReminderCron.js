import User from '../models/userModel';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import userJobsListener from '../bots/job';
import { store } from '../bot';
import { CronJob } from 'cron';
import Promise from 'bluebird';

let jobCron = new CronJob({
  cronTime: '00 30 08 * * 1-5',
  // cronTime: '23 * * * * *',
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
      include: [{
        model: Job,
        where: {
          createdAt: {
            $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
          }
        }
      }]
    }]
  })
  .then(users => {
    users.forEach(user => {
      let count = {};
      const tagArr = user.dataValues.tags.map(item => {
        return item.name;
      });
      const id = user.dataValues.slackUserId;
      const BUCKLEY = store[user.dataValues.slackTeamId];

      user.dataValues.tags.forEach(tag => {
        tag.jobs.forEach(job => {
          if (count[job.id]) { 
            count[job.id]++; 
          } else { 
            count[job.id] = 1; 
          }
        })
      })
      const keySort = Object.keys(count).sort((a, b) => { return count[b] - count[a]}).slice(0, 6);

      if (keySort.length === 0) {
        BUCKLEY.startPrivateConversation({ user: user.slackUserId }, (err, convo) =>{
          convo.say(`It seems like you don't have any tags! Please type tags and set you filters!`);
          return;
        });
      } 

      return Job.findAll({
        where: { $or: [
          { id: keySort }
        ]}
      })
      .then(jobs => {
        const message_with_jobs = {
          text: 'Good morning! I found some cool jobs you might be interested in:',
          attachments: userJobsListener.returnJobSample(jobs, 5)
        };
        BUCKLEY.startPrivateConversation({ user: user.slackUserId }, (err, convo) => {
          convo.say(message_with_jobs);
        });
      })
      .catch(err => {
        console.log('There was an error:', err);
      })
    })
  })
  .catch(err => {
    console.log('There was an error:', err);
  });
};

export default jobCron;