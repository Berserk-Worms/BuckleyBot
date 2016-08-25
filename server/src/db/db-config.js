import Sequelize from 'sequelize';

//make path for production environment
let databaseUrl;
if (process.env.NODE_ENV === 'test') {
  databaseUrl = 'postgres://localhost:5432/uncle_test';
} else if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL 
  // maps to -> postgres://ec2-user:password@localhost:5432/uncle_test
} else {
  databaseUrl = 'postgres://localhost:5432/uncle'
}

// let host =  !!process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2] : 'localhost';
let host = 'localhost';

let db = new Sequelize(databaseUrl, {
  host: host,
  protocol: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: false
});

db.authenticate()
  .then(err => {
    console.log('Database connection has been established');
  }, (err) => {
    console.log('Unable to connect to database: ', err);
  });

export default db;
