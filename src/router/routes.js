import express from 'express';
const router = express.Router();
import recordController from '../controllers/controller';
import middleware from '../middleware';
import { verifyToken } from '../helpers' 

const { postValidation, validateEmail, validateLocation, doesUserExist, validatePhonenumber } = middleware;

  /* HomePage Endpoint */
 router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));

/* Create Redflag Endpoint */
router.post('/api/v1/redflags', verifyToken, validateLocation, postValidation, recordController.createRedflag);

/* Create Intervention Endpoint */
router.post('/api/v1/interventions', verifyToken, validateLocation, postValidation, recordController.createIntervention)

/* Create User Endpoint */
router.post('/api/v1/auth/signup', validateEmail, validatePhonenumber, doesUserExist, recordController.createUser);

/* Sign In Endpoint */
router.post('/api/v1/auth/login', validateEmail, recordController.signInUser);

 /* View Redflags Endpoint */
router.get('/api/v1/redflags', verifyToken, recordController.viewAllRedflags);

 /* View interventions Endpoint */
router.get('/api/v1/interventions', verifyToken, recordController.viewAllInterventions);

   /* View One redflag Endpoint */
router.get('/api/v1/redflags/:id', verifyToken, recordController.viewOneRedflag);

 /* View One intervention Endpoint */
 router.get('/api/v1/interventions/:id', verifyToken, recordController.viewOneIntervention);

 /* Edit Redflag Comment */
 router.patch('/api/v1/redflags/:id/comment', verifyToken, recordController.editRedflagComment);
//
// /* Edit Intervention Comment */
// router.patch('/api/v1/interventions/:id/comment', recordController.editRecordComment);

 /* Edit Redflag Location */
 router.patch('/api/v1/redflags/:id/location', verifyToken, recordController.editRedflagLocation);
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
