import Job from '../models/jobModel';
import rp from 'request-promise';

// Triggered from 'POST /api/job'
// Add Job data and Tag data from jobscraper to the database 
const addJob = (req, res) => {
  let jobData = req.body.jobData;
  let tagsData = req.body.tagsData;
  //Find or create job
  //jobData is in the following structure 
  //jobData = {
  //  title: item['title'],
  //  link: item['permalink'],
  //  location: item['rss:location']['#'],
  //  company: item['a10:author']['a10:name']['#'],
  //  publishDate: item['pubDate']
  //}
  Job.findOrCreate({ where: jobData })
  .spread( (job, created) => {
    created ? console.log('new job created and adding tags:', job.dataValues.title) : console.log('exsting job found adding tags:', job.dataValues.title);
    return rp({
      url: 'http://localhost:8080/api/tags/job',
      method: 'POST',
      json: { job, tagsData }
    });
  })
  .then(() => {
    res.end();
  })
  .catch((err) => {
    console.log('error creating job', err);
    res.end();
  });
}

export default { addJob }
