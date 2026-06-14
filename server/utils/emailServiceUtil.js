const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendMail({ emailId, subject = 'Mail sub', text = 'Hello testing', html }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailId,
    subject,
    text,
    ...(html && { html }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.response);
    return info;
  } catch (err) {
    console.error('❌ Email send error:', err);
  }
}

module.exports = sendMail;
