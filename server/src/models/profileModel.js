import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from './userModel';
import intro from '../bots/introduction';

//Generates Profile model
let Profile = db.define('profile', {
  name: Sequelize.STRING, 
  location: Sequelize.STRING,
  stage: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    unique: 'compositeIndex'
  }
});

//Create a hook that will be call after a profile has been created
Profile.hook('afterCreate', (profile, options) => {
//   //invoke the buckley conversation bot
  intro(profile);
});

Profile.sync()
  .then(() => {
    console.log('Profile table is connected');
  }, (err) => {
    console.log(err);
    console.log('An error occured while generating the Profile table')
  });

export default Profile;

