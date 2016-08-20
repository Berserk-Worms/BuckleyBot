import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a Job model
//Create a composite index of all the fields
let Job = db.define('job', {
  title: {
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  }, 
  link: {
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  },
  location: {
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  },
  company: {
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  },
  publishDate: {
    type: Sequelize.DATE,
    unique: 'compositeIndex'
  },
});

Job.sync()
.then(() => {
  console.log('Job table is connected')
}, (err) => {
  console.log('An error occured while generating the Job table')
});

export default Job
