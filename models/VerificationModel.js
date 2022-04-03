import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const verificationSchema = new Schema({
  status: String,
  loggedAt: { type: Date, default: Date.now() },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  scratchCard: { type: Schema.Types.ObjectId, ref: 'ScratchCard' },
  reason: String,
});

export default model('Verification', verificationSchema);
