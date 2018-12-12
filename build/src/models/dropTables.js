'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

var dropTables = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                        switch (_context.prev = _context.next) {
                              case 0:
                                    _context.next = 2;
                                    return _db2.default.none('BEGIN;\n        DROP TABLE IF EXISTS records;\n        DROP TABLE IF EXISTS users;\n        COMMIT;').catch(function (err) {
                                          return console.log(err);
                                    });

                              case 2:
                              case 'end':
                                    return _context.stop();
                        }
                  }
            }, _callee, undefined);
      }));

      return function dropTables() {
            return _ref.apply(this, arguments);
      };
}();

dropTables();