import express from 'express';
const router = express.Router();
import recordController from '../controllers/controller';
import Middleware from '../middleware';
const postValidator = new Middleware();

<<<<<<< HEAD
 // /* HomePage Endpoint */
 // router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));
=======
 /* HomePage Endpoint */
 router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));
>>>>>>> db082357e3a6c3774f68bf39b4681900dad4c546

/* Create Redflag Endpoint */
router.post('/api/v1/redflags', postValidator.postValidation, recordController.createRecord);

/* Create Intervention Endpoint */
router.post('/api/v1/interventions', postValidator.postValidation, recordController.createRecord);
<<<<<<< HEAD
//
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
=======

/* View Redflags Endpoint */
router.get('/api/v1/redflags', recordController.viewAllRedflags);

/* View interventions Endpoint */
router.get('/api/v1/interventions', recordController.viewAllInterventions);

 /* View One redflag Endpoint */
router.get('/api/v1/redflags/:id', recordController.viewOneRedflag);

/* View One intervention Endpoint */
 router.get('/api/v1/interventions/:id', recordController.viewOneIntervention);

/* Edit Redflag Comment */
router.patch('/api/v1/redflags/:id/comment', recordController.editRecordComment);

/* Edit Intervention Comment */
router.patch('/api/v1/interventions/:id/comment', recordController.editRecordComment);

/* Edit Redflag Location */
router.patch('/api/v1/redflags/:id/location', recordController.editRecordLocation);

 /* Edit Intervention Location */
router.patch('/api/v1/interventions/:id/location', recordController.editRecordLocation);

 /* Delete an Intervention */
router.delete('/api/v1/interventions/:id', recordController.deleteIntervention);

/* Delete a Redflag */
router.delete('/api/v1/redflags/:id', recordController.deleteIntervention);"""
>>>>>>> db082357e3a6c3774f68bf39b4681900dad4c546

export default router;
