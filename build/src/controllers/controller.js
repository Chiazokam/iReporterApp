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
  createRecord: function createRecord(req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        type = _req$body.type,
        location = _req$body.location,
        comment = _req$body.comment,
        images = _req$body.images,
        videos = _req$body.videos;

    var recordDetails = { title: title, type: type, location: location, draft: 'draft', comment: comment, images: images, videos: videos };
    query.createRecordQuery(recordDetails).then(function (record) {
      var recordData = record[0].id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: recordData,
          message: 'Record posted'
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

    var hash = _bcrypt2.default.hashSync(password, 10);
    var userDetails = { firstname: firstname, lastname: lastname, othername: othername, email: email, hash: hash, phone: phone, username: username };
    query.createUserQuery(userDetails).then(function (data) {
      var user = data[0];
      var userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        othername: user.othername,
        phone: user.phone,
        isAdmin: user.isadmin
      };
      var token = _jsonwebtoken2.default.sign(userData, process.env.SECRET_KEY, { expiresIn: '2d' });
      return res.status(201).send({
        status: 201,
        data: [{
          token: token,
          user: userData
        }]
      });
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  }
};

exports.default = recordController;
