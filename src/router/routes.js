import express from 'express';
const router = express.Router();
import recordController from '../controllers/ireportControl';

/* HomePage Endpoint */
router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to iReporter' }));

/* Create Record Endpoint */
router.post('/api/v1/records', recordController.createNewRecord);

/* View Redflags Endpoint */
router.get('/api/v1/redflags', recordController.viewAllRedflags);

/* View interventions Endpoint */
router.get('/api/v1/interventions', recordController.viewAllInterventions);

/* View One redflag Endpoint */
router.get('/api/v1/redflags/:id', recordController.viewOneRedflag);

/* View One intervention Endpoint */
router.get('/api/v1/interventions/:id', recordController.viewOneIntervention);

/* Edit Redflag Comment */
router.patch('/api/v1/redflags/:id/comment', recordController.editRedflagComment);

/* Edit Intervention Comment */
router.patch('/api/v1/interventions/:id/comment', recordController.editRedflagComment);

/* Edit Redflag Location */
router.patch('/api/v1/redflags/:id/location', recordController.editRedflagLocation);

/* Edit Intervention Location */
router.patch('/api/v1/interventions/:id/location', recordController.editRedflagLocation);

/* Delete Intervention Location */
router.delete('/api/v1/interventions/:id', recordController.deleteIntervention);

export default router;
