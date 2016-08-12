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
          tag.addJob(foundJob)
          res.end();
        })
      })
    })
  //Loop through array of tags
}

export default { addJobTags }
