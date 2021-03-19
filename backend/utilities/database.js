import mongoose from 'mongoose';

const connect = () => {
  const database = process.env.NODE_ENV === 'test' ? 'test' : 'hypertube';
  mongoose.connect(`mongodb://mongo:27017/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export default { connect, closeDatabase };
