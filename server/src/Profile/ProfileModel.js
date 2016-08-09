import db from '../db/db-config';
import Sequelize from 'sequelize';
import User from '../Users/UserModel';
import Sequelize from 'sequelize';

//generate a profile model
let Profile = db.define('profile', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }, 
  location: {
    type: Sequelize.STRING
  }
});

//Add User ID to the profile as a foreign key
Profile.belongsTo(User);

Profile.sync()
  .then(err => {
    console.log('Profile Table is connected')
  }, err => {
    console.log('An error occured while generating the Profile table')
  });

export default Profile;

