'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
    var bearerHeader = req.headers['token'];

    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;

        _jsonwebtoken2.default.verify(req.token, process.env.SECRET_KEY, function (error, result) {
            if (error) {
                res.status(401).send({
                    status: 401,
                    error: 'user unauthenticated'
                });
            } else {
                req.userData = result;
                next();
            }
        });
    } else {
        res.status(401).send({
            status: 401,
            error: 'token not provided'
        });
    }
};