'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

<<<<<<< HEAD
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

=======
>>>>>>> 770e0e36ce9967e3df2b9b65fab84c5668c5f7d8
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
<<<<<<< HEAD
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
        phone = _req$body2.phone,
        username = _req$body2.username;

    query.userExistence(email, phone, username).then(function (data) {
      if (data.length > 0) {
        res.status(400).send({
          status: 400,
          error: 'User already exists'
        });
      } else {
        next();
      }
=======
        createdOn = _req$body.createdOn,
        location = _req$body.location,
        comment = _req$body.comment,
        image = _req$body.image,
        video = _req$body.video;

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
        phone = _req$body2.phone,
        username = _req$body2.username;

    query.userExistence(email, phone, username).then(function (data) {
      if (data.length > 0) {
        res.status(400).send({
          status: 400,
          error: 'User already exists'
        });
      } else {
        next();
      }
>>>>>>> 770e0e36ce9967e3df2b9b65fab84c5668c5f7d8
    }).catch(function (err) {
      res.status(500).send({ error: err.message });
    });
  },
  validateSpace: function validateSpace(req, res, next) {
    var _req$body3 = req.body,
        firstname = _req$body3.firstname,
        lastname = _req$body3.lastname,
        othername = _req$body3.othername;
    // Idea from https://stackoverflow.com/questions/17616624/detect-if-string-contains-any-spaces

    if (/\s/.test(firstname) || /\s/.test(lastname) || /\s/.test(othername)) {
      res.status(400).send({
        status: 400,
        error: 'Remove the white spaces please'
      });
    } else {
      next();
    }
  },


  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail: function validateEmail(req, res, next) {
    var email = req.body.email;
<<<<<<< HEAD

    if (/\S+@\S+\.\S+/.test(email)) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        error: 'Wrong email format'
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
=======

    if (/\S+@\S+\.\S+/.test(email)) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        error: 'Wrong email format'
      });
>>>>>>> 770e0e36ce9967e3df2b9b65fab84c5668c5f7d8
    }
  }
};

exports.default = middleware;