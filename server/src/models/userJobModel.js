import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import Job from './jobModel';

let UserJob = db.define('user_job', {});

User.belongsToMany(Job, { through: UserJob });
Job.belongsToMany(User, { through: UserJob });

export default UserJob;