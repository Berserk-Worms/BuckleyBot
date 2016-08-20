import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a Tag model
let Tag = db.define('tag', {
  name: { 
    type: Sequelize.STRING,
    unique: true
  }
});

Tag.sync()
.then(() => {
  console.log('Tag table is connected')
}, (err) => {
  console.log('An error occured while generating the Tag table')
});

export default Tag;
