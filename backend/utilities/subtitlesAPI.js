import OpenSubtitlesApi from 'opensubtitles-api';
import fs from 'fs';
import http from 'http';

const OpenSubtitles = new OpenSubtitlesApi({
  useragent: process.env.OPENSUBTITLES_MY_USER_AGENT,
  username: process.env.OPENSUBTITLES_USERNAME,
  password: process.env.OPENSUBTITLES_PASSWORD,
  ssl: true,
});

function downloadSubtitles(url, dest) {
  console.log('url', url);
  var file = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.
    http
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            if (responseSent) return;
            responseSent = true;
            resolve();
          });
        });
      })
      .on('error', (err) => {
        if (responseSent) return;
        responseSent = true;
        reject(err);
      })
      .end();
  });
}

const getSubtitles = async (imdbId) => {
  try {
    const res = await OpenSubtitles.search({
      sublanguageid: 'eng, fin, ger, rus',
      extensions: ['srt', 'vtt'],
      imdbid: imdbId,
      limit: 1,
    });
    const dir = `./subtitles/${imdbId}`;

    const options = [
      {
        lang: 'en',
        dir: `./subtitles/${imdbId}/en`,
      },
      {
        lang: 'de',
        dir: `./subtitles/${imdbId}/de`,
      },
      {
        lang: 'fi',
        dir: `./subtitles/${imdbId}/fi`,
      },
      {
        lang: 'ru',
        dir: `./subtitles/${imdbId}/ru`,
      },
    ];

    if (fs.existsSync(dir)) {
      console.log('Directory exists!');
    } else {
      fs.mkdirSync(`./subtitles/${imdbId}`);
      options.map((elem) => {
        if (res[elem.lang] && res[elem.lang][0] && res[elem.lang][0].vtt) {
          fs.mkdirSync(elem.dir);
          let path = res[elem.lang][0].vtt;
          path = !path.charAt(4).localeCompare('s') ? path.slice(0, 4) + path.slice(5) : path;
          downloadSubtitles(path, `${elem.dir}/subtitle.vtt`)
            .then(() => console.log('downloaded file no issues...'))
            .catch((e) => console.error('error while downloading', e));
        }
      });

      console.log('Directory not found.');
    }

    // return subtitles;
  } catch (err) {
    console.log('err fetching subtitles', err);
    return {};
  }
  return '';
};

export default { getSubtitles };
