import db from '../db/db-config';
import Sequelize from 'sequelize';
import Job from './jobModel';
import Tag from './tagModel';

//generate a JobTag join table 
let JobTag = db.define('job_tag', {});

Job.belongsToMany(Tag, { through: JobTag });
Tag.belongsToMany(Job, { through: JobTag });

export default JobTag
