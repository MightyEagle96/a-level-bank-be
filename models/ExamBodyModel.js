import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const examBodySchema = new Schema({ name: String, code: String });

export default model('ExaminationBody', examBodySchema);
