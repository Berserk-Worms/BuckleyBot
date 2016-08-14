import db from '../db/db-config.js';
import Sequelize from 'sequelize';

let Random = db.define('random', {
  random1: Sequelize.STRING,
  random2: Sequelize.STRING,
  random3: Sequelize.STRING
});

Random.belongsTo(Team);

Random.sync()
  .then(() => {
    console.log('Random table is connected');
  }, err => {
    console.log('An error occurred');
  });

export default Random;