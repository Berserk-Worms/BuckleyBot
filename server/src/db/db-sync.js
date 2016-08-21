import Team from '../models/teamModel';
import User from '../models/userModel';
import Job from '../models/jobModel';
import Tag from '../models/tagModel';
import JobTag from '../models/tobTagModel';
import UserJob from '../models/userJobModel';


export default () => {
  Team.sync()
  .then(() => {
    console.log('Team table is connected');
  }, (err) => {
    console.log('An error occured while generating the Team table:', err);
  });

  User.sync()
  .then(() => {
    console.log('User table is connected');
  }, (err) => {
    console.log('failed in the users table:', err);
    console.log('An error occured while generating the User table.');
  });

  Job.sync()
  .then(() => {
    console.log('Job table is connected')
  }, (err) => {
    console.log('An error occured while generating the Job table')
  });

  Tag.sync()
  .then(() => {
    console.log('Tag table is connected')
  }, (err) => {
    console.log('An error occured while generating the Tag table')
  });

  JobTag.sync()
  .then(() => {
    console.log('Job Tag table is connected')
  }, (err) => {
    console.log('An error occured while generating the Job Tag table')
  });

  UserJob.sync()
  .then(() => {
    console.log('User Job table is connected');
  }, (err) => {
    console.log('An error occurred while generating the User Job table');
  });
}

