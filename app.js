import express from 'express';
import bodyParser from 'body-parser';
import recordController from './src/controllers/ireportControl';
/* const express = require('express');
const bodyParser = require('body-parser');
const recordController = require('./src/controllers/ireportControl'); */

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => res.status(200).send({ data: [] }));

/* Create Record Endpoint */
app.post('/api/v1/records', recordController.createNewRecord);

/* View Redflags Endpoint */
app.get('/api/v1/redflags', recordController.viewAllRedflags);

/* View interventions Endpoint */
app.get('/api/v1/interventions', recordController.viewAllInterventions);

/* View One redflag Endpoint */
app.get('/api/v1/redflags/:id', recordController.viewOneRedflag);

/* View One intervention Endpoint */
app.get('/api/v1/interventions/:id', recordController.viewOneIntervention);

/* Edit Redflag Comment */
app.patch('/api/v1/redflags/:id/comment', recordController.editRedflagComment);

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port);
