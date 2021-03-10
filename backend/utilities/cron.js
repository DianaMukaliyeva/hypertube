import { CronJob } from 'cron';

const job = new CronJob('00 00 00 * * *', () => {
  // 'TO DO: delete all movies and subtitles not watched for one month';
});

export default job;
