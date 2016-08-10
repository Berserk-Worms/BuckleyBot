import express from 'express';
import bodyParser from 'body-parser';
import bot from './bot.js';
import Sequelize from 'sequelize';
import routes from './routes/router';

//server config for middleware later
// import server-config from './server-config';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client'));

const router = routes(app, express);

app.listen(port, () => {
  console.log('Server started on port ' + port);
});


