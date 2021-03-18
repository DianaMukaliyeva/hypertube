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
  // return req.protocol + '://' + req.get('host');
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

const sendResetEmail = (recipient, name, token, req) => {
  const link = `${getRootUrl(req)}/recoverylink?token=${token}`;

  const subject = 'HYPERTUBE password reset';
  const content = `
        <div style="font-size:14px; background: #060629; padding-top: 20px; padding-bottom: 20px;">
            <h3 style="color: #fb3b64; font-family:sans-serif; text-align: center;">
                Hi, ${
  name.charAt(0).toUpperCase() + name.slice(1)
}! You have submitted a password change request
            </h3>
            <p style="color:white; text-align: center; padding-top: 5px;">
                If it was you, to change your Hypertube password click the link below.
            </p>
            <p style="color:white; text-align: center; padding-top: 5px;">
                <a style="color: #fb3b64; font-weight: bold;" href="${link}">Reset my password </a>
            </p>
            <p style="color:#707281; text-align: center; padding-top: 5px;"><small>Thank you for using Hypertube
            </p>
            <p style="color:#707281; text-align: center; ">Hypertube team
            </p>
        </div>`;
  sendMail(recipient, subject, content);
  return '';
};

export default sendResetEmail;
