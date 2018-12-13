'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      res.status(400).send({
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
      res.status(400).send({
        status: 400,
        error: 'Wrong location format'
      });
    }
  },
  validatePhonenumber: function validatePhonenumber(req, res, next) {
    var phone = req.body.phone;

    if (_typeof(Number(phone)) !== Number) {
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