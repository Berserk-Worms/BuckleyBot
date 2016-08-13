import Tag from '../models/tagModel';
import Job from '../models/jobModel';
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
        //Sequelize association that adds job and tag to JobTag join table
        tag.addJob(foundJob)
        res.end();
      })
    })
  })
  .catch((err) => {
    throw err;
  });
  //Loop through array of tags
}

export default { addJobTags }
