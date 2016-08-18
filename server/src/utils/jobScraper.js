import { parseString } from 'xml2js';
import rp from 'request-promise';
import Promise from 'bluebird';
let parseStringAsync = Promise.promisify(parseString);

const tags = ['javascript', 'react', 'node.js', 'node', 'angular', 'es6', 'backbone'];

let getJobsFromStackOverflow = () => {
  // make a request to Stack Overflow for jobs data
  tags.forEach((tagName) => {
    rp({
      url:'https://stackoverflow.com/jobs/feed',
      qs: {
        searchTerm: `${tagName} posted:1d`,
        location: 'San Francisco',
        sort: 'p',
        range: '50',
        distanceUnits: 'Miles',
        type: 'permanent'
      }
    })
    .then((body) => {
      // Parse the rss feed returned by Stack Overflow
      return parseStringAsync(body);
    })
    .then((result) => {
      //If there are no jobs, assign an empty array
      let stackOverflowJobs = result['rss']['channel'][0]['item'] || [];
      //Iterate over each job returned from Stack Overflow
      return Promise.all(stackOverflowJobs.map((job) => {
        //Check to see if job is from last 24 hours
        let jobData = {
          title: job['title'][0],
          link: job['link'][0],
          location: job['location'][0]['_'],
          company: job['a10:author'][0]['a10:name'][0],
          publishDate: new Date(job['pubDate'][0])
        }
        let tagsData = tagName;
        // send data to server
        return postJobData(jobData, tagsData);
      }));
    })
    .catch((err) => {
      console.log('Error collecting jobs from Stack Overflow:', err);
    })
  });
}

let getJobsFromIndeed = () => {
  tags.forEach((tagName) => {
    let indeedOptions = {
      url: 'http://api.indeed.com/ads/apisearch',
      method: 'GET',
      json: true,
      qs: {
        publisher: '2984356110292307',
        format: 'json',
        q: tagName,
        l: 'San Francisco',
        radius: '50',
        sort: 'date',
        jt: 'fulltime',
        limit: '25',
        fromage: '1',
        co: 'us',
        userip: '1.2.3.4',
        useragent: 'Mozilla//4.0(Firefox)',
        v: '2'
      }
    }
    rp(indeedOptions)
    .then((body) => {
      let tagsData = tagName;
      let indeedJobs = body.results;
      //Return once the array of promises is resolved
      return Promise.all(indeedJobs.map((job) => {
        let jobData = {
          title: job.jobtitle,
          link: job.url.split('&')[0],
          location: job.formattedLocation,
          company: job.company,
          publishDate: new Date(job.date)
        }

        return postJobData(jobData, tagsData);
      }));
    })
    .catch((err) => {
      console.log('Error collecting jobs from Indeed:', err);
    });
  });
}


let postJobData = (jobData, tagsData) => {
  return rp({
    url: 'http://localhost:8080/api/job',
    method: 'POST',
    json: { jobData, tagsData } 
  });
}

getJobsFromStackOverflow();
getJobsFromIndeed();
