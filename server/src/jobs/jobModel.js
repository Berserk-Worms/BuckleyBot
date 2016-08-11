import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a profile model
let Job = db.define('job', {
  title: Sequelize.STRING, 
  link: Sequelize.STRING,
  location: Sequelize.STRING,
  company: Sequelize.STRING,
  publishDate: Sequelize.DATE 
});

Job.sync()
  .then(err => {
    console.log('Job table is connected')
  }, err => {
    console.log('An error occured while generating the Job table')
  });

export default Job;
