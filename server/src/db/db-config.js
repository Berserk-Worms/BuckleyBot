import Sequelize from 'sequelize';

//make path for production environment

let db; 

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DATABASE_URL.split(':')[2],
    protocol: 'postgres',
    dialect: 'postgres'

    , pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })
//and dev environment
} else {
  db = new Sequelize('uncle', null, null, {
    host: 'localhost',
    protocol: 'postgres',
    dialect: 'postgres'

    , pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })
}

db.authenticate()
  .then(err => {
    console.log('Connection has been established');
  }, (err) => {
    console.log('Unable to connect to database: ', err);
  });

export default db;
