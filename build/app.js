'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => {
  return res.status(200).send({ data: [] });
});

/* About Page Endpoint */
app.get('/api/v1/about', function (req, res) {
  return res.status(200).send({ data: [] });
});

/* ************************************************************** */
var port = process.env.PORT || 3000;
app.listen(port);
