'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

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
    location = location.trim();

    var userId = req.userData.id;
    var recordDetails = { title: title, location: location, createdBy: userId, type: 'redflag', status: 'draft', comment: comment, images: images, videos: videos };
    query.createRecordQuery(recordDetails).then(function (record) {
      var recordData = record[0].id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: recordData,
          message: 'Created Red-flag Record'
        }]
      });
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  createIntervention: function createIntervention(req, res) {
    var _req$body2 = req.body,
        title = _req$body2.title,
        location = _req$body2.location,
        comment = _req$body2.comment,
        images = _req$body2.images,
        videos = _req$body2.videos;

    var createdBy = req.userData.id;
    var recordDetails = { title: title, location: location, createdBy: createdBy, type: 'intervention', status: 'draft', comment: comment, images: images, videos: videos };
    query.createRecordQuery(recordDetails).then(function (record) {
      var recordData = record[0].id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: recordData,
          message: 'Created Intervention Record'
        }]
      });
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  createUser: function createUser(req, res) {
    var _req$body3 = req.body,
        firstname = _req$body3.firstname,
        lastname = _req$body3.lastname,
        othername = _req$body3.othername,
        email = _req$body3.email,
        password = _req$body3.password,
        phone = _req$body3.phone,
        username = _req$body3.username;

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
    var _req$body4 = req.body,
        email = _req$body4.email,
        password = _req$body4.password;

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
  },
  viewAllRedflags: function viewAllRedflags(req, res) {
    var type = 'redflag';
    var userId = req.userData.id;
    query.viewAllRecordsQuery(type, userId).then(function (records) {
      var userRecords = records[0];
      if (records.length === 0) {
        res.status(404).send({
          status: 404,
          message: 'User has no redflags'
        });
      } else {
        res.status(200).send({
          status: 200,
          data: records
        });
      }
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  viewAllInterventions: function viewAllInterventions(req, res) {
    var type = 'intervention';
    var userId = req.userData.id;
    query.viewAllRecordsQuery(type, userId).then(function (records) {
      var userRecords = records[0];
      if (records.length === 0) {
        res.status(404).send({
          status: 404,
          message: 'User has no interventions'
        });
      } else {
        res.status(200).send({
          status: 200,
          data: records
        });
      }
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  viewOneRedflag: function viewOneRedflag(req, res) {
    var userId = req.userData.id;
    var redflagId = req.params.id;
    var type = 'redflag';
    query.viewOneRecordQuery(type, userId, redflagId).then(function (record) {
      // Returns an array with one object
      if (record.length === 0) {
        res.status(404).send({
          status: 404,
          message: 'Redflag does not exist'
        });
      } else {
        res.status(200).send({
          status: 200,
          data: record
        });
      }
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  viewOneIntervention: function viewOneIntervention(req, res) {
    var userId = req.userData.id;
    var intervId = req.params.id;
    var type = 'intervention';
    query.viewOneRecordQuery(type, userId, intervId).then(function (record) {
      // Returns an array with one object
      if (record.length === 0) {
        res.status(404).send({
          status: 404,
          message: 'Intervention does not exist'
        });
      } else {
        res.status(200).send({
          status: 200,
          data: record
        });
      }
    }).catch(function (error) {
      res.status(500).send({
        error: error.message
      });
    });
  },
  editRedflagComment: function editRedflagComment(req, res) {
    var comment = req.body.comment;

    var userId = req.userData.id;
    var redflagId = req.params.id;
    var type = 'redflag';

    query.viewOneRecordQuery(type, userId, redflagId).then(function (record) {
      if (record.length < 1) {
        res.status(404).send({
          status: 404,
          message: 'Record does not exist'
        });
      } else {
        query.updateRecordComment(comment, redflagId);
        if (type === 'redflag') {
          res.status(200).send({
            status: 200,
            data: [{
              id: record[0].id,
              message: "Updated Redflag's comment"
            }]
          });
        } else if (type === 'intervention') {
          res.status(200).send({
            status: 200,
            data: [{
              id: record[0].id,
              message: "Updated Intervention's comment"
            }]
          });
        }
      }
    }).catch(function (error) {
      console.log('Ran down');
      res.status(500).send({
        error: error.message
      });
    });
  }
};

exports.default = recordController;