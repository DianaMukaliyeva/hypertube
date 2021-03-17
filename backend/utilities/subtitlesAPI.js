import OpenSubtitlesApi from 'opensubtitles-api';
import fs from 'fs';
import axios from 'axios';

const OpenSubtitles = new OpenSubtitlesApi({
  useragent: process.env.OPENSUBTITLES_MY_USER_AGENT,
  username: process.env.OPENSUBTITLES_USERNAME,
  password: process.env.OPENSUBTITLES_PASSWORD,
  ssl: true,
});

const downloadSubtitles = (subtitlesUrl, option) => new Promise((resolve) => {
  axios
    .get(subtitlesUrl, { responseType: 'stream' })
    .then((response) => {
      fs.mkdirSync(option.dir, { recursive: true });
      const file = fs.createWriteStream(`${option.dir}/subtitle.vtt`);
      response.data.pipe(file);
      file.on('finish', () => {
        resolve(option.lang);
      });
    })
    .catch(() => {
      resolve();
    });
});

const getSubtitles = async (imdbId) => {
  try {
    const parentDir = `./subtitles/${imdbId}`;

    const options = [
      {
        lang: 'en',
        dir: `${parentDir}/en`,
      },
      {
        lang: 'de',
        dir: `${parentDir}/de`,
      },
      {
        lang: 'fi',
        dir: `${parentDir}/fi`,
      },
      {
        lang: 'ru',
        dir: `${parentDir}/ru`,
      },
    ];

    let subtitles = [];

    if (fs.existsSync(parentDir)) {
      subtitles = options.reduce((accum, option) => {
        if (fs.existsSync(option.dir)) {
          accum.push(option.lang);
        }
        return accum;
      }, []);
    } else {
      const searchResult = await OpenSubtitles.search({
        sublanguageid: 'eng, fin, ger, rus',
        extensions: ['srt', 'vtt'],
        imdbid: imdbId,
        limit: 1,
      });
      const promises = [];
      options.forEach((option) => {
        if (
          searchResult[option.lang]
          && searchResult[option.lang][0]
          && searchResult[option.lang][0].vtt
        ) {
          const subtitlesUrl = searchResult[option.lang][0].vtt;
          promises.push(downloadSubtitles(subtitlesUrl, option));
        }
      });
      const result = await Promise.all(promises);
      subtitles = result.filter((r) => !!r);
    }
    return subtitles;
  } catch (err) {
    return [];
  }
};

export default { getSubtitles };
