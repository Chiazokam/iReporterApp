'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _helpers = require('../helpers');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var query = new _helpers.Queries();

_dotenv2.default.load();

var recordController = {
  createRedflag: function createRedflag(req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        location = _req$body.location,
        comment = _req$body.comment,
        images = _req$body.images,
        videos = _req$body.videos;

    title = title.trim();
    comment = comment.trim();
    images = images.trim();
    location = location.trim();
    videos = videos.trim();

    var userId = req.userData.id;
    var recordDetails = { title: title, location: location, createdBy: userId, type: 'redflag', status: 'draft', comment: comment, images: images, videos: videos };
    query.createRecordQuery(recordDetails).then(function (record) {
      var recordData = record[0].id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: recordData,
          message: 'Redflag posted'
        }]
      });
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  createUser: function createUser(req, res) {
    var _req$body2 = req.body,
        firstname = _req$body2.firstname,
        lastname = _req$body2.lastname,
        othername = _req$body2.othername,
        email = _req$body2.email,
        password = _req$body2.password,
        phone = _req$body2.phone,
        username = _req$body2.username;

    firstname = firstname.trim();
    lastname = lastname.trim();
    othername = othername.trim();
    email = email.trim();
    phone = phone.trim();
    username = username.trim();

    var hash = _bcrypt2.default.hashSync(password, 10);
    var userDetails = { firstname: firstname, lastname: lastname, othername: othername, email: email, hash: hash, phone: phone, username: username };
    query.createUserQuery(userDetails).then(function (data) {
      var user = data[0];
      var userObject = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        othername: user.othername,
        phone: user.phone,
        isAdmin: user.isadmin
      };
      var token = _jsonwebtoken2.default.sign(userObject, process.env.SECRET_KEY, { expiresIn: '2d' });
      return res.status(201).send({
        status: 201,
        data: [{
          token: token,
          user: userObject
        }]
      });
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  signInUser: function signInUser(req, res) {
    var _req$body3 = req.body,
        email = _req$body3.email,
        password = _req$body3.password;

    var hash = _bcrypt2.default.hashSync(password, 10);
    var userDetails = { email: email, hash: hash };

    query.userRegisteredQuery(email, hash).then(function (data) {
      var user = data[0];
      if (data.length > 0) {
        if (!_bcrypt2.default.compareSync(password, user.password)) {
          return res.status(401).send({
            status: 401,
            data: [{
              message: 'Username or password is incorrect'
            }]
          });
        }
        var userObject = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          othername: user.othername,
          phone: user.phone,
          isAdmin: user.isadmin
        };
        var token = _jsonwebtoken2.default.sign(userObject, process.env.SECRET_KEY, { expiresIn: '2d' });
        return res.status(200).send({
          status: 201,
          data: [{
            token: token,
            user: userObject
          }]
        });
      } else {
        return res.status(401).send({
          status: 401,
          data: [{
            message: 'Username or password is incorrect'
          }]
        });
      }
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  }
};

exports.default = recordController;