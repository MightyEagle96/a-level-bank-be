import express from 'express';
import {
  CreateCandidate,
  ViewCandidates,
} from './controllers/CandidateController.js';
import {
  CreateInstitution,
  DeleteInstitution,
  ViewInstitutions,
} from './controllers/InstitutionController.js';
import { CreateSubject, GetSubjects } from './controllers/SubjectController.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'public/images' });

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

  //subjects
  .post('/createSubject', CreateSubject)
  .get('/viewSubjects', GetSubjects)

  //Candidates
  .post('/createCandidate', upload.single('profilePhoto'), CreateCandidate)
  .get('/viewCandidates', ViewCandidates)
  //non -existent route
  .get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found on this server' });
  });

export default router;
