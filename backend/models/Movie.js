import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const movieSchema = new mongoose.Schema({
  serverLocation: { type: String, unique: true, sparse: true },
  imdbCode: { type: String, unique: true, required: true },
  downloadComplete: { type: Boolean, default: false },
  magnet: { type: String },
  size: { type: Number, default: 0 },
  lastWatched: { type: Date },
  comments: [
    {
      comment: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      time: { type: Date, default: Date.now() },
    },
  ],
});

movieSchema.plugin(uniqueValidator);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
