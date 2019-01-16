import express from 'express';
import recordController from '../controllers/controller';
import middleware from '../middleware';
import { verifyToken } from '../helpers' 

const router = express.Router(); 

const { postValidation, validateEmail, validateLocation, doesUserExist, validatePhonenumber } = middleware;

  /* HomePage Endpoint */
 router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));

/* Create Redflag Endpoint */
router.post('/api/v1/redflags', verifyToken, postValidation, recordController.createRedflag);

/* Create Intervention Endpoint */
router.post('/api/v1/interventions', verifyToken, postValidation, recordController.createIntervention)

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

/* Edit Intervention Comment */
router.patch('/api/v1/interventions/:id/comment', verifyToken, recordController.editIntervComment);

 /* Edit Redflag Location */
 router.patch('/api/v1/redflags/:id/location', verifyToken, recordController.editRedflagLocation);

  /* Edit Intervention Location */
 router.patch('/api/v1/interventions/:id/location', verifyToken, recordController.editIntervLocation);

  /* Delete an Intervention */
router.delete('/api/v1/interventions/:id', verifyToken, recordController.deleteIntervention);

 /* Delete a Redflag */
router.delete('/api/v1/redflags/:id', verifyToken, recordController.deleteRedflag);

/* Admin View All*/
router.get('/api/v1/records', verifyToken, recordController.adminViewAll);

/* Edit Record Status */
router.patch('/api/v1/records/:id/status', verifyToken, recordController.adminEditStatus);

export default router;
