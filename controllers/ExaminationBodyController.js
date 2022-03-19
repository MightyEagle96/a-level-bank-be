import ExamBodyModel from '../models/ExamBodyModel.js';
import { ErrorHandler } from './ErrorController.js';

export const CreateExamBody = async (req, res) => {
  try {
    await ExamBodyModel.create(req.body);
    res.json({ title: 'Success', message: 'Exam body created' });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const ViewExamBodies = async (req, res) => {
  const examBodies = await ExamBodyModel.find();
  res.json({ examBodies });
};

export const EditExamBody = async (req, res) => {
  await ExamBodyModel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ title: 'Success', message: 'Updated successfully' });
};

export const DeleteExamBody = async (req, res) => {
  await ExamBodyModel.findByIdAndDelete(req.params.id);
  res.json({ title: 'Success', message: 'Examination body deleted' });
};
