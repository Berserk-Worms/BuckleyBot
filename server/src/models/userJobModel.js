import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Job from './jobModel';

let UserJob = db.define('user_job', {
  ignore: Sequelize.BOOLEAN
});

User.belongsToMany(Job, { through: UserJob, foreignKey: 'slackUserId' });
Job.belongsToMany(User, { through: UserJob });

export default UserJob;