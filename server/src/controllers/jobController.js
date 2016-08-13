import Job from '../models/jobModel';
import request from 'request';

//Post method for the api route /api/job
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
      //Create tags if it's a new job
      if (created) {
        console.log('created new job', job.dataValues.title);
        request({
          url: 'http://localhost:8080/api/tags/job',
          method: 'POST',
          json: { job, tagsData }
        }, (err, resp, body) => {
          //TODO check the resp status and body
          //If the job and tags save successfully we should expect a status of 200
          //If we turn this into a microservice into the future we should have a proper response with the user and tag data being sent back
          res.end()
        })
      } else {
        console.log('we already have that job in the database');
        res.end();
      }
    })
}

export default { addJob }
