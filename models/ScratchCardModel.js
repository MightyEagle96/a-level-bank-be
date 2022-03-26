import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const scratchCardSchema = new Schema({
  pin: { type: String, unique: [true, 'already exists'] },
  usedBy: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  limit: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

export default model('ScratchCard', scratchCardSchema);
