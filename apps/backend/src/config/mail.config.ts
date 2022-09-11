export const MailConfig = {
  service: 'nodemailer',
  from: process.env.MAIL_FROM,
  stmpAuth: {
    host: process.env.MAIL_AUTH_HOST,
    port: process.env.MAIL_AUTH_PORT,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  },
};
