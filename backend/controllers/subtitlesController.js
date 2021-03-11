import fs from 'fs';

const getSubtiles = async (req, res) => {
  const { imdbCode, lang } = req.params;

  const filename = `./subtitles/${imdbCode}/${lang}/subtitle.vtt`;

  const readStream = fs.createReadStream(filename);

  readStream.on('open', () => {
    const head = {
      'Content-Type': 'text/vtt',
    };
    res.writeHead(200, head);
    readStream.pipe(res);
  });
  readStream.on('error', (err) => {
    res.end(err);
  });
};

export default {
  getSubtiles,
};
