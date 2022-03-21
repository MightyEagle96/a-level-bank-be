import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt';

const accountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: [true, 'Email address already exists'],
    lowerCase: true,
    required: true,
  },
  password: { type: String },
  role: String,
  profilePhoto: String,
});

accountSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default model('Account', accountSchema);
