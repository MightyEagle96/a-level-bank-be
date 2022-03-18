import SubjectModel from '../models/SubjectModel.js';
import { ErrorHandler } from './ErrorController.js';

export const CreateSubject = async (req, res) => {
  try {
    await SubjectModel.create(req.body);
    res.json({ message: 'New Subject created', title: 'Success' });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const GetSubjects = async (req, res) => {
  const subjects = await SubjectModel.find(req.query);
  res.json({ subjects });
};
