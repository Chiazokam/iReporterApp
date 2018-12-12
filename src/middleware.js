const express = require('express');
const bodyParser = require('body-parser');
import { Queries } from './helpers'

const query = new Queries();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const middleware = {
  postValidation(req, res, next) {
    const { title, location, comment } = req.body;
    const errors = {};
    if (!title || !location || !comment) {
      if (!title) {
        errors['title'] = 'Missing title';
      }
      if (!location) {
        errors['location'] = 'Missing location';
      }
      if (!comment) {
        errors['comment'] = 'Missing comment';
      }
      if (errors) {
        return res.status(400).send({ error: errors });
      }
    }
    next();
  },

  doesUserExist(req, res, next) {
    const { email, phone, username } = req.body;
    query.userExistence(email, phone, username)
      .then((data) => {
        if(data.length > 0) {
          res.status(400).send({
            status: 400,
            error: 'User already exists'
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send({error: err.message});
      })
  },

  validateSpace(req, res, next) {
    const { firstname, lastname, othername } = req.body;
    // Idea from https://stackoverflow.com/questions/17616624/detect-if-string-contains-any-spaces
    if (/\s/.test(firstname) || /\s/.test(lastname) || /\s/.test(othername)) {
      res.status(400).send({
        status: 400,
        error: 'Remove the white spaces please'
      })
    } else {
      next();
    }
  },

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(req, res, next) {
    const { email } = req.body;
    if (/\S+@\S+\.\S+/.test(email)) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        error: 'Wrong email format'
      })
    }
  },

  validatePhonenumber(req, res, next) {
    const { phone } = req.body;
    if(typeof(Number(phone)) !== Number){
      res.status(400).send({
        status: 400,
        error: 'Wrong Phone Number format'
      })
    } else {
      next();
    }
  },
};

export default middleware;
