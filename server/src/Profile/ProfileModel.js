import db from '../db/db-config';
import User from '../Users/UserModel';

//generate a profile model
let Profile = db.define('profile', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bio_name: {
    type: Sequelize.STRING
  }, 
  bio_location: {
    type: Sequelize.STRING
  }
});

//Add User ID to the profile as a foreign key
Profile.hasOne(User, {foreignKey: 'fk_user'});

export default Profile;

