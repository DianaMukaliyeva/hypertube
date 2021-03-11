import OpenSubtitlesApi from 'opensubtitles-api';
import fs from 'fs';
import http from 'http';

const OpenSubtitles = new OpenSubtitlesApi({
  useragent: process.env.OPENSUBTITLES_MY_USER_AGENT,
  username: process.env.OPENSUBTITLES_USERNAME,
  password: process.env.OPENSUBTITLES_PASSWORD,
  ssl: true,
});

const downloadSubtitles = (url, dest) => {
  const file = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    let responseSent = false; // flag to make sure that response is sent only once.
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
};

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

    let subtitles = [];

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(`./subtitles/${imdbId}`);
      options.forEach((elem) => {
        if (res[elem.lang] && res[elem.lang][0] && res[elem.lang][0].vtt) {
          fs.mkdirSync(elem.dir);
          let path = res[elem.lang][0].vtt;
          path = !path.charAt(4).localeCompare('s') ? path.slice(0, 4) + path.slice(5) : path;
          downloadSubtitles(path, `${elem.dir}/subtitle.vtt`).then(subtitles.push(elem.lang));

          // TO DO remove folder if .vtt file is empty
        }
      });

      if (subtitles.length === 0) {
        fs.rmdirSync(dir, { recursive: true });
      }
    } else {
      subtitles = options.reduce((accum, option) => {
        if (fs.existsSync(option.dir)) {
          accum.push(option.lang);
        }
        return accum;
      }, []);
    }
    return subtitles;
  } catch (err) {
    return [];
  }
};

export default { getSubtitles };
