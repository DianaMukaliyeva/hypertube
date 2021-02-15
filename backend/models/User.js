/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    index: true,
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    index: true,
  },
  password: { type: String, required: true },
  avatar: String,
  token: String,
  language: { type: String, default: 'en', enum: ['en', 'fi', 'ru', 'de'] },
  watched: [{ movieId: String, time: String }],
  oauth: Array,
});

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
