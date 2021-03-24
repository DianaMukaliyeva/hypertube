import nodemailer from 'nodemailer';

const {
  EMAIL, EMAIL_PWD, FRONTEND_URL_DEV, NODE_ENV,
} = process.env;
const email = EMAIL;
const emailPassword = EMAIL_PWD;

const url = NODE_ENV === 'production' ? 'http://localhost' : FRONTEND_URL_DEV;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: emailPassword,
  },
});

const getRootUrl = () => {
  if (url) return url;
  return url;
};

const sendMail = (recipient, subject, content) => {
  const mailOptions = {
    from: 'hypertube@no-reply.com',
    to: recipient,
    subject,
    html: content,
  };

  transporter.sendMail(mailOptions);
};

const translations = (lang, name) => {
  switch (lang) {
    case ('fi'): return {
      subject: 'HYPERTUBE salasanan vaihto',
      title: `Hei, ${name.charAt(0).toUpperCase() + name.slice(1)}! Saimme pyynnön vaihtaa salasanasi.`,
      info: 'Jos haluat vaihtaa salasanan, klikkaa linkkiä.',
      link: 'Vaihda salasana',
      thanks: 'Kiitos, että käytät Hypertubea!',
      team: 'Hypertube-tiimi',
    };
    case ('ru'): return {
      subject: 'HYPERTUBE password reset',
      title: `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}! You have submitted a password change request.`,
      info: 'If it was you, to change your Hypertube password click the link below.',
      link: 'Reset my password',
      thanks: 'Thank you for using Hypertube',
      team: 'Hypertube team',
    };
    case ('de'): return {
      subject: 'HYPERTUBE password reset',
      title: `Hallo, ${name.charAt(0).toUpperCase() + name.slice(1)}! Sie haben erfolgreich Ihr Passwort zurückgesetzt.`,
      info: 'Bitte klicken Sie den unten angegebenen Link, um Ihr Passwort zu ändern.',
      link: 'Passwort zurücksetzen',
      thanks: 'Vielen Dank für die Nutzung von Hypertube',
      team: 'Ihr Hypertube Team',
    };
    default: return {
      subject: 'HYPERTUBE password reset',
      title: `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}! You have submitted a password change request.`,
      info: 'If it was you, to change your Hypertube password click the link below.',
      link: 'Reset my password',
      thanks: 'Thank you for using Hypertube',
      team: 'Hypertube team',
    };
  }
};

const sendResetEmail = (recipient, name, token, req, lang) => {
  const link = `${getRootUrl(req)}/recoverylink?token=${token}`;
  const t = translations(lang, name);
  const content = `
    <div style="font-size:14px; background: #060629; padding-top: 20px; padding-bottom: 20px;">
      <h3 style="color: #fb3b64; font-family:sans-serif; text-align: center;">
        ${t.title}
      </h3>
      <p style="color:white; text-align: center; padding-top: 5px;">
        ${t.info}            </p>
      <p style="color:white; text-align: center; padding-top: 5px;">
        <a style="color: #fb3b64; font-weight: bold;" href="${link}">${t.link}</a>
      </p>
      <p style="color:#707281; text-align: center; padding-top: 5px;"><small>
        ${t.thanks}
      </p>
      <p style="color:#707281; text-align: center; ">
        ${t.team}
      </p>
    </div>`;
  sendMail(recipient, t.subject, content);
  return '';
};

export default sendResetEmail;
