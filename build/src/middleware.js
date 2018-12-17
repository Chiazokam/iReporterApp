'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var express = require('express');
var bodyParser = require('body-parser');


var query = new _helpers.Queries();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var middleware = {
  postValidation: function postValidation(req, res, next) {
    var _req$body = req.body,
        title = _req$body.title,
        location = _req$body.location,
        comment = _req$body.comment;

    var errors = {};
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
  doesUserExist: function doesUserExist(req, res, next) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        username = _req$body2.username;

    query.userExistence(email, username).then(function (data) {
      if (data.length > 0) {
        res.status(400).send({
          status: 400,
          error: 'User already exists'
        });
      } else {
        next();
      }
    }).catch(function (err) {
      console.log("Failing....");
      res.status(500).send({ error: err.message });
    });
  },


  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail: function validateEmail(req, res, next) {
    var email = req.body.email;

    if (/\S+@\S+\.\S+/.test(email)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong email format'
      });
    }
  },
  validateLocation: function validateLocation(req, res, next) {
    var location = req.body.location;

    location = location.trim();
    if (/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm.test(location)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong location format'
      });
    }
  },
  validatePhonenumber: function validatePhonenumber(req, res, next) {
    var phone = req.body.phone;

    if (typeof Number(phone) !== 'number') {
      res.status(400).send({
        status: 400,
        error: 'Wrong Phone Number format'
      });
    } else {
      next();
    }
  }
};

exports.default = middleware;