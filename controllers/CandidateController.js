import CandidateModel from '../models/CandidateModel.js';

export const CreateCandidate = async (req, res) => {
  try {
    await CandidateModel.create(req.body);

    res.json({ title: 'Success', message: 'Candidate created' });
  } catch (error) {}
};
