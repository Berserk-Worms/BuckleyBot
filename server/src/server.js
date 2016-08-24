import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';

import { teams } from './bot';
import Sequelize from 'sequelize';
import routes from './routes/router';
import jobCron from './utils/jobReminderCron';

const app = express();
const port = process.env.PORT || 8080;
const httpsPort = 8443;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client'));

const router = routes(app);

app.listen(port, () => {
  //invoking teams to generate all instances of bots
  //which exist in the database
  teams();
  console.log('Server started on port ' + port);
  // start cron job to do daily job reminder
  jobCron.start();
});

