import { connection } from '../bot.js';
import Tag from '../tags/tagModel';
import Job from '../jobs/jobModel';
import _ from 'underscore';


let userJobsListener = {
  replyWithJobs: function(bot, message) {
    Tag.findOne({
      where: { name: 'javascript' }
    })
    .then((tag) => {
      if (tag) {
        tag.getJobs()
        .then((jobs) => {

          //Filter with sequelize
          let filterJobs = _.filter(jobs, (job) => {
            return job.dataValues.title.toLowerCase().indexOf('lead') === -1 && 
              job.dataValues.title.toLowerCase().indexOf('senior') && 
              job.dataValues.title.toLowerCase().indexOf('manager') &&
              job.dataValues.title.toLowerCase().indexOf('sr.')
          })

          //Format job data for Slack
          let attachments = _.map(filterJobs, (job) => {
            return {
              title: `:computer: ${job.dataValues.title}`,
              text: `:office: ${job.dataValues.company} - ${job.dataValues.location} \n :link: ${job.dataValues.link}`
            }
          })

          //Set attachment to message to be three random jobs
          let reply_with_attachments = {
            attachments: _.sample(attachments, 3)
          }

          //reply with jobs
          bot.reply(message, reply_with_attachments)
        })
      }
    })
  }
}


export default userJobsListener 
