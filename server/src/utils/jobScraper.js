import FeedParser from 'feedparser';
import request from 'request';
import rp from 'request-promise';

let getJobsFromStackOverflow = () => {
  // make a request to Stack Overflow for jobs data
  let tags = ['reactjs', 'javascript', 'react', 'node', 'node.js', 'angular', 'angularjs', 'es6', 'backbone'];
  // let tags = ['reactjs'];
  tags.forEach((tagName) => {
    let req = request({
      url:'https://stackoverflow.com/jobs/feed',
      qs: {
        searchTerm: tagName,
        location: 'San Francisco',
        sort: 'p'
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
      let item;
      //While there are things to read from the request stream
      while(item = this.read()) {
        console.log('boba', item);
        //Check if job has the following properites
        if (item['title'] && item['permalink'] && item['categories'].includes(tagName) && item['rss:location']['#'] && item['pubDate'] && item['a10:author']['a10:name']['#']) {  

          //Setup job object with database columns
          let jobData = {
            title: item['title'],
            link: item['permalink'],
            location: item['rss:location']['#'],
            company: item['a10:author']['a10:name']['#'],
            publishDate: item['pubDate']
          }

          let tagsData = tagName;

          let options = { 
            url: 'http://localhost:8080/api/job',
            method: 'POST',
            json: { jobData, tagsData } 
          }
          // send data to server
          request(options, (err, resp, body) => {
            //Throw error if we are unable to save jobs tags into database
            if (err) {
              throw err;
            }
          });
        }
      }
    });
  })
  
}

let getJobsFromIndeed = () => {
  let tags = ['reactjs', 'javascript', 'react', 'node', 'node.js', 'angular', 'angularjs', 'es6', 'backbone'];
  // let tags = ['reactjs']
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
        sort: 'date',
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
      // console.log('test', body);
      // console.log('length', body.results.length);
      console.log('boba', body);
      let tagsData = tagName
      return Promise.all(body.results.map((indeedJob) => {
        let jobData = {
          title: indeedJob.jobtitle,
          link: indeedJob.url.split('&')[0],
          location: indeedJob.formattedLocation,
          company: indeedJob.company,
          publishDate: new Date(indeedJob.date)
        }
        return rp({
          url: 'http://localhost:8080/api/job',
          method: 'POST',
          json: { jobData, tagsData } 
        })
      }))
    })
    .then(() => {
      console.log('finished:', tagName);
    })
    .catch((err) => {
      console.log(err);
    })
  });
}

getJobsFromStackOverflow();
getJobsFromIndeed();
