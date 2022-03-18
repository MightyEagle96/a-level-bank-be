import express from 'express';
import {
  CreateInstitution,
  DeleteInstitution,
  ViewInstitutions,
} from './controllers/InstitutionController.js';

const router = express.Router();

router
  .get('/', (req, res) => {
    res.json({
      message: `Server active. Requested at ${new Date().toDateString()}-${new Date().toTimeString()}`,
    });
  })
  //institutions
  .post('/createInstitution', CreateInstitution)
  .get('/viewInstitutions', ViewInstitutions)
  .delete('/deleteInstitution/:id', DeleteInstitution)

  //non -existent route
  .get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found on this server' });
  });

export default router;
