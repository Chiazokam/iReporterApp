'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'babel-polyfill';

var recordController = {
  createRecord: function createRecord(req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        createdOn = _req$body.createdOn,
        createdBy = _req$body.createdBy,
        type = _req$body.type,
        location = _req$body.location,
        comment = _req$body.comment,
        images = _req$body.images,
        videos = _req$body.videos;

    _db2.default.any('INSERT INTO records(title, createdOn, createdBy, type, comment, location, status, images, videos)\n          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [title, createdOn, createdBy, type, comment, location, 'draft', images, videos]).then(function (record) {
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
  }
};

exports.default = recordController;