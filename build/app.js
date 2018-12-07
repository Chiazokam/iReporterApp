'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ireportControl = require('./src/controllers/ireportControl');

var _ireportControl2 = _interopRequireDefault(_ireportControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* const express = require('express');
const bodyParser = require('body-parser');
const recordController = require('./src/controllers/ireportControl'); */

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

/* HomePage Endpoint */
app.get('/api/v1', function (req, res) {
  return res.status(200).send({ data: [] });
});

/* Create Record Endpoint */
app.post('/api/v1/records', _ireportControl2.default.createNewRecord);

/* View Redflags Endpoint */
app.get('/api/v1/redflags', _ireportControl2.default.viewAllRedflags);

/* View interventions Endpoint */
app.get('/api/v1/interventions', _ireportControl2.default.viewAllInterventions);

/* View One redflag Endpoint */
app.get('/api/v1/redflags/:id', _ireportControl2.default.viewOneRedflag);

/* View One intervention Endpoint */
app.get('/api/v1/interventions/:id', _ireportControl2.default.viewOneIntervention);

/* Edit Redflag Comment */
app.patch('/api/v1/redflags/:id/comment', _ireportControl2.default.editRedflagComment);

module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port);