import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const movieSchema = new mongoose.Schema({
  serverLocation: { type: String, unique: true, sparse: true },
  imdbCode: { type: String, unique: true, required: true },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String, required: true },
      time: { type: Date, default: Date.now },
    },
  ],
});

movieSchema.plugin(uniqueValidator);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
