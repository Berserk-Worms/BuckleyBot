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

export default Job
