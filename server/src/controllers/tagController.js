import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import request from 'request';

//Add Tags
const addJobTags = (req, res) => {
  let job = req.body.job;
  let tagData = req.body.tagData;
  let jobData = null;

  Job.findOne({
    where: {
      id: job.id
    }
  })
  .then((foundJob) => {
    jobData = foundJob;
    return Tag.findOrCreate({ 
      where: { name: tagData }
    });
  })
  .spread((tag, created) => {
    return tag.addJob(jobData);
  })
  .then((tagJob) => {
    res.end();
  })
  .catch((err) => {
    console.log('Error creating tag:', err);
  });
  //Loop through array of tags
}

export default { addJobTags }
