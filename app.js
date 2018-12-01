const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.static('public'));

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => res.status(200).send({ data: [] }));

/* About Page Endpoint */
app.get('/api/v1/about', (req, res) => res.status(200).send({ data: [] }));


module.exports = app;
/* ************************************************************** */
const port = process.env.PORT || 3000;
app.listen(port);
