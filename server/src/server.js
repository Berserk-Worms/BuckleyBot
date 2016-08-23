import express from 'express';
import bodyParser from 'body-parser';
import { teams } from './bot';
import routes from './routes/router';
import jobCron from './utils/jobReminderCron';
import jobScrape from './utils/jobScraper';
import db from './db/db-config';


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client'));

const router = routes(app, express);
db.sync()
.then(() => {
  app.listen(port, () => {
    console.log('Server started on port ' + port);
    console.log(`${process.env.NODE_ENV} database synced`);
    //invoking teams to generate all instances of bots
    //which exist in the database
    teams();
    
    // start cron job to do daily job reminder
    jobCron.start();
    jobScrape.start();
  });
})
.catch((err) => {
  console.log('Error syncing the DB', err);
})


export default app;
