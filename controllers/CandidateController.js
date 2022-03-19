import CandidateModel from '../models/CandidateModel.js';

export const CreateCandidate = async (req, res) => {
  try {
    await CandidateModel.create(req.body);

    res.status(201).json({ title: 'Success', message: 'Candidate created' });
  } catch (error) {}
};

export const ViewCandidates = async (req, res) => {
  const candidates = await CandidateModel.find(req.query).populate([
    'institution',
    'subject1.subject',
    'subject2.subject',
    'subject3.subject',
  ]);

  res.json({ candidates });
};
