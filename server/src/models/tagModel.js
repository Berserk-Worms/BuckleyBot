import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a Tag model
let Tag = db.define('tag', {
  name: { 
    type: Sequelize.STRING,
    unique: true
  }
});

export default Tag;
