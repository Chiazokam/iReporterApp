'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./router/routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _docs = require('../docs.json');

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_express2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_routes2.default);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000", "https://eye-reporter.herokuapp.com", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + "Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_docs2.default));

module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);