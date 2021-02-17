import mongoose from 'mongoose';

const connect = () => {
  mongoose.connect('mongodb://mongo:27017/hypertube', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default { connect };
