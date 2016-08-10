import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from '../users/userModel';

//Generates Profile model
let Profile = db.define('profile', {
  name: Sequelize.STRING, 
  location: Sequelize.STRING
});

//Add userId to the profile as a foreign key
Profile.belongsTo(User);

Profile.sync()
  .then(err => {
    console.log('Profile table is connected');
  }, err => {
    console.log('An error occured while generating the Profile table');
  });

export default Profile;

