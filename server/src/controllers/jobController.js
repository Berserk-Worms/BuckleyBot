import Job from '../models/jobModel';
import rp from 'request-promise';

//Post method for the api route /api/job
const addJob = (req, res) => {
  let jobData = req.body.jobData;
  //Find or create job
  //jobData is in the following structure 
  //jobData = {
  //  title: item['title'],
  //  link: item['permalink'],
  //  location: item['rss:location']['#'],
  //  company: item['a10:author']['a10:name']['#'],
  //  publishDate: item['pubDate']
  //}

  //Check if we have the correct fields
  if (Object.keys(jobData).length === 5 && jobData.title && jobData.link && jobData.location && jobData.company && jobData.publishDate) {
    Job.findOrCreate({ where: jobData })
    .spread((job, created) => {
      created ? console.log('new job created and adding tags:', job.dataValues.title) : console.log('exsting job found adding tags:', job.dataValues.title);
      res.send(job);
    })
    .catch((err) => {
      console.log('error creating job', err);
      res.end()
    });
  } else {
    res.status(500).send('Job Data is incorrectly formatted')
  }
}

export default { addJob }
