import express from 'express';
import {
  CreateCandidate,
  UploadCandidatePhoto,
  ViewCandidate,
  ViewCandidates,
} from './controllers/CandidateController.js';
import {
  CreateInstitution,
  DeleteInstitution,
  UpdateInstitution,
  ViewInstitutions,
} from './controllers/InstitutionController.js';
import { CreateSubject, GetSubjects } from './controllers/SubjectController.js';
import multer from 'multer';
import {
  CreateExamBody,
  DeleteExamBody,
  EditExamBody,
  ViewExamBodies,
  ViewExamBody,
} from './controllers/ExaminationBodyController.js';
import { CreateAccount, Login } from './Authentication/AuthController.js';
import {
  CreateScratchCards,
  UseScratchCard,
  ViewScratchCards,
} from './controllers/ScratchCardController.js';
import GetVerifications from './controllers/VerificationController.js';

const router = express.Router();

const upload = multer({ dest: 'public/images' });

router
  .get('/', (req, res) => {
    res.json({
      message: `Server active. Requested at ${new Date().toDateString()}-${new Date().toTimeString()}`,
    });
  })
  //create account
  .post('/createAccount', CreateAccount)
  .post('/login', Login)

  //institutions
  .post('/createInstitution', CreateInstitution)
  .get('/viewInstitutions', ViewInstitutions)
  .delete('/deleteInstitution/:id', DeleteInstitution)
  .patch('/updateInstitution/:id', UpdateInstitution)

  //subjects
  .post('/createSubject', CreateSubject)
  .get('/viewSubjects', GetSubjects)

  //Candidates
  .post('/createCandidate', CreateCandidate)
  .get('/viewCandidates', ViewCandidates)
  .post(
    '/uploadCandidatePhoto/:id',
    upload.single('profilePhoto'),
    UploadCandidatePhoto
  )
  .get('/viewCandidate/:id', ViewCandidate)

  //examination body
  .post('/createExaminationBody', CreateExamBody)
  .get('/viewExamBodies', ViewExamBodies)
  .get('/viewExamBody/:id', ViewExamBody)
  .patch('/editExamBody/:id', EditExamBody)
  .delete('/deleteExamBody/:id', DeleteExamBody)

  //Scratch Card
  .post('/createPin', CreateScratchCards)
  .post('/useScratchCard', UseScratchCard)
  .get('/viewScratchCards', ViewScratchCards)

  //Verifications
  .get('/getVerifications', GetVerifications)

  //non -existent route
  .get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found on this server' });
  });

export default router;
