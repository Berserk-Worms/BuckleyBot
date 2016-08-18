import { connection } from '../bot.js';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import _ from 'underscore';
import UserJob from '../models/userJobModel';
import helper from '../bots/helper';


let userJobsListener = {
  replyWithJobs: function(bot, message) {
    helper.findTags(message)
      .then(tags => {
        let query = (tags.length === 0) ? 'javascript' : tags[0];
        return Tag.findOne({
          where: { name: query}
        })
      })
      .then((tag) => {
        if (tag) {
          tag.getJobs()
          .then((jobs) => {

            //TODO Filter with sequelize rather than _.filter
            let filterJobs = _.filter(jobs, (job) => {
              //TODO: Need to do further filtering to ensure that the 
              //user's saved job does not show up in slack
              
              return job.dataValues.title.toLowerCase().indexOf('lead') === -1 && 
                job.dataValues.title.toLowerCase().indexOf('senior') === -1 && 
                job.dataValues.title.toLowerCase().indexOf('manager') === -1 &&
                job.dataValues.title.toLowerCase().indexOf('sr.') === -1 &&
                job.dataValues.title.toLowerCase().indexOf('intern') === -1
            })
            console.log(filterJobs.length)


            //Format job data for Slack message attachment 
            let attachments = _.map(filterJobs, (job) => {
              return {
                title: `:computer: ${job.dataValues.title}`,
                text: `:office: ${job.dataValues.company} - ${job.dataValues.location} \n :link: ${job.dataValues.link}`,
                callback_id: `clickSaveJobs`,
                attachment_type: `default`,
                actions: [
                  {name: `saveJob`, text: `Save`, value: job.dataValues.id, type: `button`, style: `default`}
                ]
              }
            })

            //Set attachment to message to be three random jobs
            let reply_with_attachments = {
              text: 'Some Jobs',
              attachments: _.sample(attachments, 15)
            }

            bot.reply(message, reply_with_attachments);
          })
        }
      })
  }
}


export default userJobsListener 
