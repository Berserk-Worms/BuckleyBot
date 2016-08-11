import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from '../users/userModel';
import introduction from '../bot/introduction';

//Generates Profile model
let Profile = db.define('profile', {
  name: Sequelize.STRING, 
  location: Sequelize.STRING
});

//Add userId to the profile as a foreign key
Profile.belongsTo(User);

//Create a hook that will be call after a profile has been created
Profile.hook('afterCreate', (profile, options) => {
//   //invoke the buckley conversation bot
  introduction(profile);
});

Profile.sync()
  .then(err => {
    console.log('Profile table is connected');
  }, err => {
    console.log('An error occured while generating the Profile table');
  });

export default Profile;

