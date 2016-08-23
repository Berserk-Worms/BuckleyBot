import User from '../models/userModel';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import userJobsListener from '../bots/job';
import { store } from '../bot';
import { startConvo } from '../bots/introduction';
import { CronJob } from 'cron';

let jobCron = new CronJob({
  // cronTime: '00 30 08 * * 1-5',
  cronTime: '45 * * * * *',
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
      model: Tag
    }]
  })
  .then(users =>{
    users.forEach(user => {
      console.log(user.dataValues.tags);
      let tagArr = user.dataValues.tags.map(item => {
        return item.name
      });
      const id = user.dataValues.slackUserId;
      const BUCKLEY = store[user.dataValues.slackTeamId];
      console.log('this is the tagArr, ', tagArr);

      //if no tags, show all jobs from database
      //if all tags, show jobs with javascript tag
      // let count = {};

      // tagArr.forEach(item => {
      //   let count = {};
      //   Tag.find({
      //     where: { name: item},
      //     include: [{ model :Job }]
      //   })
      //   .then(found => {
      //     // console.log('found in tagArr, ', found.jobs[0])
      //     found.jobs.forEach(job => {
      //       if (count[job.dataValues.id]) {
      //         count[job.id]++;
      //       } else {
      //         count[job.id] = 1;
      //       }
      //     })
      //   })
      // })

      // Tag.findAll({
      //   where: {
      //     $or: [
      //       { name : tagArr }
      //     ]
      //   },
      //   include: [{ model: Job }]
      // })


      Tag.findOne({
        // TODO: Figure out how to make this a join table
        where: { name: 'javascript' },
        include: [{ model: Job }],
      })
      .then((tag) => {
        // console.log('this is the tag in jobcron, ', tag.jobs);
        if (tag) {
          //Set attachment to message to be three random jobs
          let message_with_jobs = {
            text: 'Good morning! I found some cool jobs you might be interested in:',
            attachments: userJobsListener.returnJobSample(tag.jobs, 3)
          };
          BUCKLEY.startPrivateConversation({ user: id }, (err, convo) => {
            convo.say(message_with_jobs);
          });
        }
      })
      .catch(err => {
        console.log('Error:', err);
      });
    });
  })
  .catch(err => {
    console.log('There was an error:', err);
  });
};

export default jobCron;