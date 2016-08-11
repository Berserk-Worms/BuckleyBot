import rp from 'request-promise';
import FeedParser from 'feedparser';


let getJobsFromStackOverflow = () => {
  let req = request('https://stackoverflow.com/jobs/feed?searchTerm=JavaScript&location=San+Francisco&sort=p');
  let parser = new FeedParser();

  req.on('error', function(err) {
    throw err;
  })

  req.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    this.pipe(parser);
  })

  parser.on('error', function(err) {
    throw err;
  })
  let count = 0
  parser.on('readable', function() {
    let item;
    while(item = this.read()) {
      console.log('boba');
      // console.log(item);
      console.log('title:', item['title']);
      console.log('link:', item['permalink']);
      console.log('category:', item['categories']);
      console.log('location:', item['rss:location']['#'])
      console.log('published:', item['pubDate'])
      console.log('author', item['a10:author']['a10:name']['#']);

      if (item['title'] && item['permalink'] && item['categories'] && item['rss:location']['#'] && item['pubDate'] && item['a10:author']['a10:name']['#']) {
        count++
      }
    }
    console.log('number of postings:', count)
  })
}

getJobsFromStackOverflow();