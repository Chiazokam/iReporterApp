'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./router/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_routes2.default);

module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);