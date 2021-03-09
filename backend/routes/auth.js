import express from 'express';

import authController from '../controllers/authController.js';
import inputValidator from '../utilities/inputValidator.js';

// to remove
import fs from 'fs';

const authRoute = express.Router();

authRoute.post('/login', inputValidator.validateLogin, authController.login);

authRoute.post('/recoverylink', inputValidator.validateEmail, authController.recoveryEmail);

authRoute.get('/google', authController.googleURL);

authRoute.get('/google/callback', authController.googleCallback);

authRoute.get('/token/:key', authController.getUserToken);

authRoute.get('/42', authController.fortytwoURL);

authRoute.get('/42/callback', authController.fortytwoCallback);
// TO DO  remove when real movie stream is done
// TO DO  also delete ./subtitles/sample.mp4

authRoute.get('/stream', (req, res) => {
  const path = './subtitles/sample.mp4';
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

export default authRoute;
