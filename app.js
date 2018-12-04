const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => res.status(200).send({ data: [] }));

/* About Page Endpoint */
app.get('/api/v1/about', (req, res) => res.status(200).send({ data: [] }));

/* ************************************************************** */
const port = process.env.PORT || 3000;
app.listen(port);
