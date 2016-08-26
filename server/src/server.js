import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';
import enforce from 'express-sslify';

import { teams } from './bot';
import routes from './routes/router';
import jobCron from './utils/jobReminderCron';
import jobScrape from './utils/jobScraper';
import db from './db/db-config';

const app = express();
const port = process.env.PORT || 8080;
const httpsPort = 8443;
const env = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client'));

const router = routes(app);

console.log('NODE_ENV is', env);

db.sync()
.then(() => {

  // If development
  if (env === 'test' || env === 'dev' || env === undefined) {
    app.listen(port, () => {
      //Emit start event;
      app.emit('appStarted');
      console.log('Server started on port ' + port);
      console.log(`${env} database synced`);
      //invoking teams to generate all instances of bots
      //which exist in the database
      teams();
      
      // start cron job to do daily job reminder
      jobCron.start();
      jobScrape.start();
    });
  } else if (env === 'production') {
    // Enforce HTTPS if running on prod
    app.use(enforce.HTTPS());
    // if production
    const credentials = {
      key: fs.readFileSync('/etc/letsencrypt/live/buckleybot.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/buckleybot.com/fullchain.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/buckleybot.com/chain.pem'),
    };

    var httpServer = http.createServer(app).listen(port, () => {console.log('Http server redirecting to https')});
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(httpsPort, () => {
      teams();
      console.log('---- HTTPS Server started on port ' + httpsPort);
      jobCron.start();
      jobScrape.start();
    });
  } 
})
.catch((err) => {
  console.log('Error syncing the DB', err);
});

export default app;
