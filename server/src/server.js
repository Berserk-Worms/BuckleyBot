import express from 'express';
import bodyParser from 'body-parser';
import bot from './bot';
import dbConnect from './db/db-config';
import Sequelize from 'sequelize';
// import routes from './routes/router';
//server config for middleware later
// import server-config from './server-config';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client'));

var sequelize = new Sequelize('uncle', null, null, {
  host: 'localhost',
    protocol: 'postgres',
    dialect: 'postgres'

    , pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});

sequelize
  .authenticate()
  .then(err => {
      console.log('Connection has been established');
    }, (err) => {
      console.log('Unable to connect to database: ', err);
    });


// const router = routes(app, express);


app.get('/', function(req, res) {
  res.json('Hello World')
});

app.listen(port, () => {
  console.log('server started on port ' + port);
});


