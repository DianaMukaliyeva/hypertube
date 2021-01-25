import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// connect to Mongo daemon
mongoose
  .connect(`mongodb://mongo:27017/hypertube`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let Item = mongoose.model('item', ItemSchema);

app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.get('/', (req, res) => {
  console.log('we are here');
  res.json('Hi from backend!!!');
});

app.get('/items', async (req, res) => {
  console.log('in get items');
  const items = await Item.find();
  res.json({ items: items });
});

app.post('/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json());
});

export default app;
