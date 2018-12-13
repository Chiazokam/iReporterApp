'use strict';

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

var createTables = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db2.default.none('BEGIN;\n    CREATE TABLE IF NOT EXISTS users(\n      id SERIAL PRIMARY KEY,\n      username VARCHAR(128) UNIQUE NOT NULL,\n      firstname VARCHAR(128) NOT NULL,\n      lastname VARCHAR(128) NOT NULL,\n      othername VARCHAR(128),\n      email VARCHAR(128) UNIQUE NOT NULL,\n      password VARCHAR(128) NOT NULL,\n      phone VARCHAR(128) NOT NULL,\n      isAdmin BOOLEAN DEFAULT false,\n      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE TABLE IF NOT EXISTS records(\n        id SERIAL PRIMARY KEY,\n        title VARCHAR(128) NOT NULL,\n        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        createdBy INT REFERENCES users(id),\n        type TEXT NOT NULL,\n        comment VARCHAR(128) NOT NULL,\n        location VARCHAR(128) NOT NULL,\n        status VARCHAR(128) NOT NULL,\n        images VARCHAR(128),\n        videos VARCHAR(128)\n    );\n    COMMIT;').catch(console.log);

          case 2:
            _context.next = 4;
            return _db2.default.none('BEGIN;\n    INSERT INTO users(username,\n                      firstname,\n                      lastname,\n                      othername ,\n                      email,\n                      password,\n                      phone,\n                      isAdmin)\n          VALUES(\'Zokky\', \'Chiazokam\', \'Echeta\', \'Chioma\' , \'chiazokamecheta@gmail.com\', \'root\', \'07032425466\', true);\n    COMMIT;\n    ').catch(console.log);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createTables() {
    return _ref.apply(this, arguments);
  };
}();

createTables();