import { connection } from '../bot.js';
import _ from 'underscore';
import helper from '../bots/helper';

let userJobsListener = {
  replyWithJobs: function(bot, message) {
    helper.findJobTags(message)
    .then(tags => {
      let count = {};
      if (tags.length > 0) {
        if (tags.length === 1) {
          let sample = this.returnJobSample(tags[0].jobs, 3);
        } else {
          tags.forEach(tag => {
            tag.jobs.forEach(job => {
              if (count[job.id]) {
                count[job.id]++;
              } else {
                count[job.id] = 1;
              }
            }); 
          });
        let sample = this.returnJobSample(tags[0].jobs, 3);
        }
        console.log(count);

        //Set attachment to message to be three random jobs
        let reply_with_attachments = {
          text: 'Here are some jobs:',
          attachments: sample
        };
        bot.reply(message, reply_with_attachments);
      } else {
        bot.reply(message, "Sorry, I couldn't find any new jobs -- please check back soon :)");
      }
    });
  },
  returnJobSample: (jobs, numberOfJobs) => {
    //TODO Filter with sequelize rather than _.filter
    let filterJobs = _.filter(jobs, (job) => {
      //TODO: Need to do further filtering to ensure that the 
      //user's saved job does not show up in slack
      
      let jobTitle = job.title.toLowerCase();

      return jobTitle.indexOf('lead') === -1 && 
        jobTitle.indexOf('senior') === -1 && 
        jobTitle.indexOf('manager') === -1 &&
        jobTitle.indexOf('sr.') === -1 &&
        jobTitle.indexOf('principal') === -1;
    });
    console.log("# of filtered jobs:", filterJobs.length);

    //Format job data for Slack message attachment 
    let attachments = _.map(filterJobs, (job) => {
      return {
        title: `:computer: ${job.title}`,
        text: `:office: ${job.company} - ${job.location} \n :link: ${job.link}`,
        callback_id: `clickSaveJobs`,
        attachment_type: `default`,
        actions: [
          {name: `saveJob`, text: `Save`, value: job.id, type: `button`, style: `default`}
        ]
      };
    });

    let sample = _.sample(attachments, numberOfJobs);
    return sample;
  }
};

export default userJobsListener; 
