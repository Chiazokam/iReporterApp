'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var Middleware = function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, [{
    key: 'postValidation',
    value: function postValidation(req, res, next) {
      var _req$body = req.body,
          title = _req$body.title,
          createdOn = _req$body.createdOn,
          location = _req$body.location,
          comment = _req$body.comment,
          image = _req$body.image,
          video = _req$body.video;

      var errors = {};
      if (!title || !createdOn || !location || !comment) {
        if (!title) {
          errors['title'] = 'Missing title';
        }
        if (!createdOn) {
          errors['createdOn'] = 'Missing date';
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
    }
  }]);

  return Middleware;
}();

;

exports.default = Middleware;