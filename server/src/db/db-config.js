import Sequelize from 'sequelize';

//make path for production environment
let databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/uncle';
let host =  !!process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2] : 'localhost';

let db = new Sequelize(databaseUrl, {
  host: host,
  protocol: 'postgres',
  dialect: 'postgres',

<<<<<<< ecb01819b8143dcea3e9d3bffdce19681896f6a4
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});
=======
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  }) : new Sequelize('uncle', null, null, {
    host: 'localhost',
    protocol: 'postgres',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });
>>>>>>> Merge master into infra-conversation

db.authenticate()
  .then(err => {
    console.log('Database connection has been established');
  }, (err) => {
    console.log('Unable to connect to database: ', err);
  });

export default db;
