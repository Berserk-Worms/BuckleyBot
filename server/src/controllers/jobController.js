import Job from '../models/jobModel';

// Triggered from 'POST /api/job' 
const addJob = (req, res) => {
  let jobData = req.body.jobData;
  //Check if we have the correct fields
  if (jobData && jobData.title && jobData.link && jobData.location && jobData.company && jobData.publishDate) {
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
      created ? 
        console.log('new job created and adding tags:', job.dataValues.title) :
        console.log('exsting job found adding tags:', job.dataValues.title);
      created ? res.status(201).send(job) : res.status(200).send(job)
    })
    .catch((err) => {
      console.log('error creating job', err);
      res.status(500).send('error creating job', err);
    });
  } else {
    res.status(500).send('Job data is incorrect');
  }
}

export default { addJob }
