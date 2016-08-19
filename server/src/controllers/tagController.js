import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import request from 'request';

//Add Tags
const addJobTags = (req, res) => {
  let job = req.body.job;
  let tagData = req.body.tagData;
  let jobData = null;

  //check to see if we have valid data
  if (job && job.id && typeof job.id === 'number' && typeof tagData === 'string') {

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
    .spread((tagJob) => {
      res.send(tagJob);
    })
    .catch((err) => {
      console.log('Error creating tag:', err);
    });

  } else {
    res.status(500).send('Tag data is incorrect');
  }
  //Loop through array of tags
}

export default { addJobTags }
