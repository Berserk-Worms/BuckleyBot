import Job from '../models/jobModel';
import Tag from '../models/tagModel';
import JobTag from '../models/jobTagModel';

const addJobTag = (req, res) => {
  let jobId = req.body.jobId;
  let tagId = req.body.tagId;
  let foundJob;

  Job.findById(jobId)
  .then((job) => {
    foundJob = job;
    return Tag.findById(tagId)
  })
  .then((tag) => {
    return tag.addJob(foundJob)
  })
  .then((jobTag) => {
    res.end();
  })
  .catch((err) => {
    console.log('Error creating job tag association', err);
    res.end();
  });

}

export default { addJobTag }