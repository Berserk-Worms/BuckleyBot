import db from '../db/db-config';
import Sequelize from 'sequelize';
import Job from '../jobs/jobModel';
import Tag from '../tags/tagModel';

//generate a JobTag join table 
let JobTag = db.define('job_tag', {});

Job.belongsToMany(Tag, { through: JobTag });
Tag.belongsToMany(Job, { through: JobTag });

JobTag.sync()
  .then(() => {
    console.log('Job Tag table is connected')
  }, (err) => {
    console.log('An error occured while generating the Job Tag table')
  });


export default JobTag
