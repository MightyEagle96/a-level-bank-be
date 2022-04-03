import VerificationModel from '../models/VerificationModel.js';

const GetVerifications = async (req, res) => {
  const verifications = await VerificationModel.find();
  res.json({ verifications });
};

export default GetVerifications;
