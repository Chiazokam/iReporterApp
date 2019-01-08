import express from 'express';
import bodyParser from 'body-parser';
import router from './router/routes';
import cors from "cors";;


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000", "https://eye-reporter.herokuapp.com", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, " +
      "Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
