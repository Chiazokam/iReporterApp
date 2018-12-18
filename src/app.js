import express from 'express';
import bodyParser from 'body-parser';
import router from './router/routes';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
