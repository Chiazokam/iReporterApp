'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('../controllers/controller');

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var postValidation = _middleware2.default.postValidation,
    validateSpace = _middleware2.default.validateSpace,
    validateEmail = _middleware2.default.validateEmail,
    doesUserExist = _middleware2.default.doesUserExist,
    validatePhonenumber = _middleware2.default.validatePhonenumber;

// /* HomePage Endpoint */
// router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));

/* Create Redflag Endpoint */

router.post('/api/v1/redflags', _helpers2.default, postValidation, _controller2.default.createRedflag);

/* Create Intervention Endpoint */
//router.post('/api/v1/interventions', postValidation, recordController.createRecord);

/* Create User Endpoint */
router.post('/api/v1/auth/signup', validateSpace, validateEmail, doesUserExist, _controller2.default.createUser);

/* Sign In Endpoint */
router.post('/api/v1/auth/login', validateSpace, validateEmail, _controller2.default.signInUser);

// /* View Redflags Endpoint */
// router.get('/api/v1/redflags', recordController.viewAllRedflags);
//
// /* View interventions Endpoint */
// router.get('/api/v1/interventions', recordController.viewAllInterventions);
//
//  /* View One redflag Endpoint */
// router.get('/api/v1/redflags/:id', recordController.viewOneRedflag);
//
// /* View One intervention Endpoint */
//  router.get('/api/v1/interventions/:id', recordController.viewOneIntervention);
//
// /* Edit Redflag Comment */
// router.patch('/api/v1/redflags/:id/comment', recordController.editRecordComment);
//
// /* Edit Intervention Comment */
// router.patch('/api/v1/interventions/:id/comment', recordController.editRecordComment);
//
// /* Edit Redflag Location */
// router.patch('/api/v1/redflags/:id/location', recordController.editRecordLocation);
//
//  /* Edit Intervention Location */
// router.patch('/api/v1/interventions/:id/location', recordController.editRecordLocation);
//
//  /* Delete an Intervention */
// router.delete('/api/v1/interventions/:id', recordController.deleteIntervention);
//
// /* Delete a Redflag */
// router.delete('/api/v1/redflags/:id', recordController.deleteIntervention);"""

exports.default = router;