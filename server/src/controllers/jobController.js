import Job from '../models/jobModel';
import rp from 'request-promise';

// Triggered from 'POST /api/job'
// Add Job data and Tag data from jobscraper to the database 
const addJob = (req, res) => {
  let jobData = req.body.jobData;
  //Find or create job

  //Check if we have the correct fields
  if (jobData.title && jobData.link && jobData.location && jobData.company && jobData.publishDate) {
    Job.findOrCreate({ 
      where: {  
        title: jobData.title,
        link: jobData.link,
        location: jobData.location,
        company: jobData.company,
        publishDate: jobData.publishDate
      } 
    })
    .spread((job, created) => {
      created ? console.log('new job created and adding tags:', job.dataValues.title) : console.log('exsting job found adding tags:', job.dataValues.title);
      created ? res.status(201).send(job) : res.status(200).send(job)
    })
    .catch((err) => {
      console.log('error creating job', err);
      res.end()
    });
  } else {
    res.status(500).send('Job data is incorrect')
  }
}

export default { addJob }
