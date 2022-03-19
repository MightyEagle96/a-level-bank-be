import CandidateModel from '../models/CandidateModel.js';
import { google } from 'googleapis';
import fs from 'fs';
import { ErrorHandler } from './ErrorController.js';

const KEYFILEPATH = 'public/alevelbankcredential.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
export const CreateCandidate = async (req, res) => {
  try {
    const candidate = await CandidateModel.create(req.body);

    const newFileName = `${candidate._id}_${Date.now()}.${
      req.file.mimetype.split('/')[1]
    }`;

    const filePath = `public/images/${newFileName}`;

    fs.rename(`public/images/${req.file.filename}`, filePath, async () => {});
    CreateAndUploadFile(auth, newFileName, filePath, req, candidate, res).then(
      () => {
        fs.unlink(filePath, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    );
    // res.status(201).json({ title: 'Success', message: 'Candidate created' });
  } catch (error) {
    console.log(error);
    ErrorHandler(error, res);
  }
};

async function CreateAndUploadFile(
  auth,
  newFileName,
  filePath,
  req,
  candidate,
  res
) {
  const driveService = google.drive({ version: 'v3', auth });

  let fileMetaData = {
    name: newFileName,
    parents: ['1PqVsP4LutGwnPds6ZYblEULG2JDEh1CU'],
  };
  let media = {
    mimeType: req.file.mimeType,
    body: fs.createReadStream(filePath),
  };

  // res.json({ title: 'Sucess', message: 'Profile photo uploaded' });

  let response = await driveService.files.create({
    requestBody: fileMetaData,
    media,
    fields: 'id',
  });

  switch (response.status) {
    case 200:
      await CandidateModel.findByIdAndUpdate(candidate._id, {
        imageUrl: `https://drive.google.com/uc?id=${response.data.id}`,
      });
      res.json({ title: 'Success', message: 'Candidate Created' });
      break;

    default:
      break;
  }
}

export const ViewCandidates = async (req, res) => {
  const candidates = await CandidateModel.find(req.query).populate([
    'institution',
    'subject1.subject',
    'subject2.subject',
    'subject3.subject',
  ]);

  res.json({ candidates });
};
