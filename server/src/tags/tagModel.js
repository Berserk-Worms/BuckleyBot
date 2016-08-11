import db from '../db/db-config';
import Sequelize from 'sequelize';

//generate a Tag model
let Tag = db.define('tag', {
  name: Sequelize.STRING
});

Tag.sync()
  .then(err => {
    console.log('Tag table is connected')
  }, err => {
    console.log('An error occured while generating the Tag table')
  });

export default Tag;
