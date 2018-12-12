import express from 'express';
const router = express.Router();
import recordController from '../controllers/controller';
import middleware from '../middleware';

 // /* HomePage Endpoint */
 // router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));

/* Create Redflag Endpoint */
router.post('/api/v1/redflags', middleware.postValidation, recordController.createRecord);

/* Create Intervention Endpoint */
router.post('/api/v1/interventions', middleware.postValidation, recordController.createRecord);

/* Create User Endpoint */
router.post('/api/v1/users', middleware.validateSpace, middleware.validateEmail, middleware.doesUserExist, recordController.createUser);

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

export default router;
