import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const candidateSchema = new Schema({
  lastName: String,
  firstName: String,
  regNumber: { type: String, unique: [true, 'Reg Number exists'] },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: true,
  },
});

export default model('Candidate', candidateSchema);
