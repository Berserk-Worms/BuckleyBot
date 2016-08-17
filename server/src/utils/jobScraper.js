import FeedParser from 'feedparser';
import request from 'request';
import rp from 'request-promise';

let getJobsFromStackOverflow = () => {
  // make a request to Stack Overflow for jobs data
  let tags = ['javascript', 'react', 'node.js', 'node', 'angular', 'es6', 'backbone'];
  tags.forEach((tagName) => {
    let req = request({
      url:'https://stackoverflow.com/jobs/feed',
      qs: {
        searchTerm: tagName,
        location: 'San Francisco',
        sort: 'p',
        range: '50',
        distanceUnits: 'Miles',
        type: 'permanent'
      }
    });
    //Instantiate RSS feedparser
    let parser = new FeedParser();

    req.on('error', function(err) {
      throw err;
    });

    req.on('response', function(res) {
      if (res.statusCode !== 200) {
        return this.emit('error', new Error('Bad status code'));
      } 
      //Pipe data from request stream to feedparser
      this.pipe(parser);
    })

    parser.on('error', function(err) {
      throw err;
    });

    //Do something when there is data being piped in
    parser.on('readable', function() {
      let stackJob;
      //While there are things to read from the request stream
      while(stackJob = this.read()) {
        
        //Check if job has the following properites
        if (stackJob['title'] && stackJob['permalink'] && stackJob['categories'].includes(tagName) && stackJob['rss:location']['#'] && stackJob['pubDate'] && stackJob['a10:author']['a10:name']['#']) {  

          //Setup job object with database columns
          let jobData = {
            title: stackJob['title'],
            link: stackJob['permalink'],
            location: stackJob['rss:location']['#'],
            company: stackJob['a10:author']['a10:name']['#'],
            publishDate: stackJob['pubDate']
          }

          let tagsData = tagName;

          // send data to server
          postJobData(jobData, tagsData)
          .catch((err) => {
            console.log(err);
          })
        }
      }
    });
  });
  
}

let getJobsFromIndeed = () => {
  let tags = ['javascript', 'react', 'node', 'node.js', 'node', 'angular', 'es6', 'backbone'];
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
      let tagsData = tagName
      //Return once the array of promises is resolved
      return Promise.all(body.results.map((indeedJob) => {
        let jobData = {
          title: indeedJob.jobtitle,
          link: indeedJob.url.split('&')[0],
          location: indeedJob.formattedLocation,
          company: indeedJob.company,
          publishDate: new Date(indeedJob.date)
        }

        return postJobData(jobData, tagsData);
      }));
    })
    .catch((err) => {
      console.log(err);
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
