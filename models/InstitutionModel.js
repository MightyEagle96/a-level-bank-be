import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const institutionSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'The name of this institution already exists'],
  },
});

export default model('Institution', institutionSchema);
