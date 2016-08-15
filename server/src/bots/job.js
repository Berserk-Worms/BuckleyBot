import { connection } from '../bot.js';
import Tag from '../models/tagModel';
import Job from '../models/jobModel';
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

          //TODO Filter with sequelize rather than _.filter
          let filterJobs = _.filter(jobs, (job) => {
            return job.dataValues.title.toLowerCase().indexOf('lead') === -1 && 
              job.dataValues.title.toLowerCase().indexOf('senior') === -1 && 
              job.dataValues.title.toLowerCase().indexOf('manager') === -1 &&
              job.dataValues.title.toLowerCase().indexOf('sr.') === -1
          })

          console.log(filterJobs.length)
          //Format job data for Slack message attachment 
          let attachments = _.map(filterJobs, (job) => {
            // console.log(job);
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
            attachments: _.sample(attachments, 3)
          }

          //reply with jobs
          //current reply with 3 jobs

          // { attachments:
          //   [ 
          //     { title: ':computer: Drupal Developer for Nonprofit Projects at Giant Rabbit, LLC (Berkeley, CA)',
          //       text: ':office: Giant Rabbit, LLC - Berkeley, CA \n :link: https://stackoverflow.com/jobs/122644/drupal-developer-for-nonprofit-projects-giant-rabbit-llc',
          //       callback_id: 'clickSaveJobs',
          //       attachment_type: 'default',
          //       actions: [Object] },
          //     { title: ':computer: Front End Engineering Guru at Lyra Health (Burlingame, CA)',
          //       text: ':office: Lyra Health - Burlingame, CA \n :link: https://stackoverflow.com/jobs/120874/front-end-engineering-guru-lyra-health',
          //       callback_id: 'clickSaveJobs',
          //       attachment_type: 'default',
          //       actions: [Object] },
          //     { title: ':computer: Full Stack Engineer at Keen IO (San Francisco, CA) (allows remote)',
          //       text: ':office: Keen IO - San Francisco, CA \n :link: https://stackoverflow.com/jobs/95978/full-stack-engineer-keen-io',
          //       callback_id: 'clickSaveJobs',
          //       attachment_type: 'default',
          //       actions: [Object] } ] }

          // let botReply = [
          //   {
          //     attachments: reply_with_attachments.attachments[0]
          //   },
          //   {
          //     attachments: reply_with_attachments.attachments[1]
          //   },
          //   {
          //     attachments: reply_with_attachments.attachments[2]
          //   }
          // ];

          // let n = 2;
          // while (n > -1) {
          //   console.log(`this is inside while loop @${n}, `, reply_with_attachments.attachments[n])
          //   bot.reply(message, botReply[n])
          //   n--;
          // }

          bot.reply(message, reply_with_attachments);
        })
      }
    })
  }
}


export default userJobsListener 
