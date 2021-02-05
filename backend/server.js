/* eslint-disable no-console */
import app from './app.js';

const { PORT: port } = process.env;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
