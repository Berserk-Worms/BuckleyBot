import { connection, store } from '../bot.js';
import _ from 'underscore';
import helper from '../bots/helper';
import User from '../models/userModel';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';

let userJobsListener = {
  //reply with jobs for users that suit their tags
  //should not display saved or ignored jobs
  replyWithJobs: (bot, message) => {
    //do a joined query that will return user, tags, and jobs
    User.findOne({
      where: { slackUserId: message.user },
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
    .then(user => {
      //start instance of bot 
      const BUCKLEY = store[user.dataValues.slackTeamId];
      const count = {};
      //create an object thta will find jobs with most matched tags
      user.dataValues.tags.forEach(tag => {
        tag.jobs.forEach(job => {
          if (count[job.id]) {
            count[job.id]++;
          } else {
            count[job.id] = 1;
          }
        })
      })
      //sort the object by count
      const keySort = Object.keys(count).sort((a, b) => { return count[b] - count[a]}).slice(0, 100);

      if (keySort.length === 0) {
        BUCKLEY.startPrivateConversation({ user: user.slackUserId }, (err, convo) => {
          convo.say(`It seems like you don't have any tags! Please type tags and set you filters!`);
          return;
        });
      }

      //get the users saved and ignored jobs to geneerate a uniqueJob arr
      helper.getUserJobs(user.slackUserId)
      .then(savedJobs => {
        let userSaveJobs = [];
        savedJobs.forEach(job => {
          userSaveJobs.push(`${job.jobId}`);
        })
        //slice by three instead of getting a gigantic array to search for jobs
        let uniqueJobs = _.difference(keySort, userSaveJobs);
        console.log('this is unique jobs,', uniqueJobs);

        return Job.findAll({
          where: { 
            id: uniqueJobs.slice(0, 30)
          }
        })
        .then(jobs => {
          console.log('this is the jobs length,', jobs.length)
          if (jobs.length > 0) {
            let jobArr = [];
            //parse the job data
            jobs.forEach(job => {
              jobArr.push(job.dataValues);
            })

            //filter jobs
            console.log('jobArr,',jobArr);
            //set the cards for the message
            let sample = userJobsListener.returnJobSample(jobArr, 3);
            console.log('sample length,', sample.length);
            let reply_with_attachments = {
              text: 'Here are some jobs:',
              attachments: sample
            };
            bot.reply(message, reply_with_attachments);
          } else {
            bot.reply(message, "Sorry, I couldn't find any new jobs -- please check back soon :)");
          }
        })
      })
    });
  },
  returnJobSample: (jobs, numberOfJobs) => {
    // console.log(jobs);
    let filterJobs = _.filter(jobs, (job) => {
      //TODO: Need to do further filtering to ensure that the 
      //user's saved job does not show up in slack
      
      let jobTitle = job.title.toLowerCase();

      return jobTitle.indexOf('lead') === -1 && 
        jobTitle.indexOf('senior') === -1 && 
        jobTitle.indexOf('manager') === -1 &&
        jobTitle.indexOf('sr.') === -1 &&
        jobTitle.indexOf('principal') === -1
        jobTitle.indexOf('staff') === -1;
    });
    console.log("# of filtered jobs:", filterJobs.length);

    //Format job data for Slack message attachment 
    let attachments = _.map(filterJobs.slice(0, numberOfJobs), (job) => {
      return {
        title: `:computer: ${job.title}`,
        text: `:office: ${job.company} - ${job.location} \n :link: ${job.link}`,
        callback_id: `clickSaveJobs`,
        attachment_type: `default`,
        actions: [
          {name: `saveJob`, text: `Save`, value: job.id, type: `button`, style: `default`},
          {name: `ignoreJob`, text: `Ignore This Job`, value: job.id, type: `button`, style: `default`}
        ]
      };
    });

    return attachments;
  }
};

export default userJobsListener; 
