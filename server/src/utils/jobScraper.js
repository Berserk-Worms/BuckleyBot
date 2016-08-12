import FeedParser from 'feedparser';
import request from 'request';

let getJobsFromStackOverflow = () => {
  // make a request to Stack Overflow for jobs data
  let req = request('https://stackoverflow.com/jobs/feed?searchTerm=JavaScript&location=San+Francisco&sort=p');
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
      //Check if job has the following properites

      if (item['title'] && item['permalink'] && item['categories'].length > 0 && item['rss:location']['#'] && item['pubDate'] && item['a10:author']['a10:name']['#']) {  

        //Setup job object with database columns
        let jobData = {
          title: item['title'],
          link: item['permalink'],
          location: item['rss:location']['#'],
          company: item['a10:author']['a10:name']['#'],
          publishDate: item['pubDate']
        }

        let tagsData = item['categories'];

        let options = { 
          url: 'http://localhost:8080/api/job',
          method: 'POST',
          json: { jobData, tagsData } 
        }
        //send data to server
        request(options, (err, resp, body) => {
          //Throw error if we are unable to save jobs tags into database
          if (err) {
            throw err;
          }
        });
      }
    }
  });
}

getJobsFromStackOverflow();
