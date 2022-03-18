import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  title: { type: String, unique: [true, 'Subject already exists'] },
  code: { type: String, unique: [true, 'Code already exists'] },
});

export default model('Subject', subjectSchema);
