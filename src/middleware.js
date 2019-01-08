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
    if (!title || !title.trim() || !location || !location.trim() || !comment || !comment.trim()) {
      if (!title || !title.trim()) {
        errors['title'] = 'Improper title format';
      }
      if (!location || !location.trim()) {
        errors['location'] = 'Improper location format';
      }
      if (!comment || !comment.trim()) {
        errors['comment'] = 'Improper comment format  ';
      }
      if (errors) {
        return res.status(400).send({ status: 400, error: errors });
      }
    }
    next();
  },

  doesUserExist(req, res, next) {
    const { email, username } = req.body; 
    query.userExistence(email, username)
      .then((data) => {
        if (data.length > 0) {
          res.status(400).send({
            status: 400,
            error: 'User already exists'
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        console.log("Failing....")
        res.status(500).send({error: err.message});
      })
  },

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(req, res, next) {
    const { email } = req.body;
    if (/\S+@\S+\.\S+/.test(email)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong email format'
      })
    }
  },

  validateLocation(req, res, next) {
    let { location } = req.body;
    location = location.trim();
    if(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm.test(location)){
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong location format'
    })
    }
  },

  validatePhonenumber(req, res, next) {
    const { phone } = req.body;
    if(typeof(Number(phone)) !== 'number'){
      res.status(400).send({
        status: 400,
        error: 'Wrong Phone Number format'
      })
    } else {
      next();
    }
  }
}

export default middleware;
