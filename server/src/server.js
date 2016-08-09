import express from 'express';
import bodyParser from 'body-parser';
import bot from './bot';
//server config for middleware later
// import server-config from './server-config';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.json('Hello World')
});

app.listen(port, () => {
  console.log('server started on port ' + port);
});


