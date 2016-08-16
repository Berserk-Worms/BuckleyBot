import Tag from '../models/tagModel';
import Job from '../models/jobModel';
import request from 'request';

//Add Tags
const addJobTags = (req, res) => {
  let job = req.body.job;
  let tagsData = req.body.tagsData;
  let jobData = null;

  Job.findOne({
    where: {
      id: job.id
    }
  })
  .then((foundJob) => {
    jobData = foundJob;
    return Promise.all(tagsData.map((name) => {
      return Tag.findOrCreate({ 
        where: { name: name }
      });
    }));
  })
  .then((tagsArray) => {
    return Promise.all(tagsArray.map((tag) => {
      return tag[0].addJob(jobData);
    }));
  })
  .then(() => {
    res.end();
  })
  .catch((err) => {
    console.log('Error creating tag:', err);
  });
  //Loop through array of tags
}

export default { addJobTags }
