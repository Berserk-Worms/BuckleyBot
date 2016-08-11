import Tag from './tagModel';
import Job from '../jobs/jobModel';
import request from 'request';

//Add Tags
const addJobTags = (req, res) => {
  let job = req.body.job;
  let tagsData = req.body.tagsData;

  Job.findOne({
    where: {
      id: job.id
    }
  })
    .then( (foundJob) => {
      tagsData.forEach((tag) => {
        Tag.findOrCreate({ 
          where: { name: tag }
        })
        .spread((tag, created) => {
          if (created) {
            console.log('created new tag', tag.dataValues.name);
            tag.addJob(foundJob)
            res.end();
          } else {
            res.end();
            console.log('we already have the tag:', tag.dataValues.name);
          }
        })
      })
    })
  //Loop through array of tags
}

export default { addJobTags }
