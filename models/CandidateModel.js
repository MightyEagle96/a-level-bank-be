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
  examinationBody: {
    type: Schema.Types.ObjectId,
    ref: 'ExaminationBody',
    required: true,
  },
  imageUrl: String,
  subject1: {
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    grade: String,
  },
  subject2: {
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    grade: String,
  },
  subject3: {
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    grade: String,
  },
});

export default model('Candidate', candidateSchema);
