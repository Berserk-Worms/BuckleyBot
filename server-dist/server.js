'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//server config for middleware later
// import server-config from './server-config';

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
  res.json('Hello World');
});

app.listen(port, function () {
  console.log('server started on port ' + port);
});