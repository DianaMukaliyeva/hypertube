/* eslint-disable no-console */
import mongoose from 'mongoose';

const connect = () => {
  mongoose.connect(
    'mongodb://mongo:27017/hypertube',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log('MongoDB Connected');
    },
  );
};

export default { connect };
