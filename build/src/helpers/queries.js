'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queries = function () {
  function Queries() {
    _classCallCheck(this, Queries);
  }

  _createClass(Queries, [{
    key: 'createRecordQuery',
    value: function createRecordQuery(recordDetails) {
      _db2.default.any('INSERT INTO records(title, type, comment, location, status, images, videos)\n          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [recordDetails.title, recordDetails.type, recordDetails.comment, recordDetails.location, recordDetails.draft, recordDetails.images, recordDetails.videos]);
    }
  }, {
    key: 'userExistence',
    value: function userExistence(email, phone, username) {
      return _db2.default.any('SELECT * FROM users WHERE email = $1 OR phone = $2 OR username = $3', [email.trim(), phone.trim(), username.trim()]);
    }

    // userDetails is an object

  }, {
    key: 'createUserQuery',
    value: function createUserQuery(userDetails) {
      return _db2.default.any('INSERT INTO users(firstname, lastname, othername, email, password, phone, username)\n          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [userDetails.firstname, userDetails.lastname, userDetails.othername, userDetails.email, userDetails.password, userDetails.phone, userDetails.username]);
    }
  }]);

  return Queries;
}();

exports.default = Queries;