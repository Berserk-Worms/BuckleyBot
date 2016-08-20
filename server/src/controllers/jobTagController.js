import Job from '../models/jobModel';
import Tag from '../models/tagModel';
import JobTag from '../models/jobTagModel';

const addJobTag = (req, res) => {
  let jobId = req.body.jobId;
  let tagId = req.body.tagId;
  let foundJob;

  if (typeof jobId === 'number' && typeof tagId === 'number') {
    Job.findById(jobId)
    .then((job) => {
      if (job) {
        foundJob = job;
        return Tag.findById(tagId)
      } else {
        throw new Error(`Could not find the job with ID ${jobId}`)
      }
    })
    .then((tag) => {
      if (tag) {
        return JobTag.findOrCreate({ where: { jobId, tagId } })
      } else {
        throw new Error(`Could not find the job with ID ${tagId}`)
      }
    })
    .spread((jobTag, created) => {
      if (jobTag) {
        created ? res.status(201).send(jobTag) : res.status(200).send(jobTag);
      }
    })
    .catch((err) => {
      console.log('Error creating job tag association', err);
      res.status(500).send(err);
    });
  } else {
    res.status(500).send('Invalid id types');
  }
}

export default { addJobTag }
