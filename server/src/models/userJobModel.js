import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Job from './jobModel';

let UserJob = db.define('user_job', {});

User.belongsToMany(Job, { through: UserJob });
Job.belongsToMany(User, { through: UserJob });

UserJob.sync()
  .then(() => {
    console.log('User Job table is connected');
  }, (err) => {
    console.log('An error occurred while generating the User Job table');
  });

export default UserJob;