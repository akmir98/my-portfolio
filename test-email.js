require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('✅ Email User:', process.env.EMAIL_USER);
console.log('✅ Email Pass:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Found');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // ✅ Send email to yourself
  subject: 'Test Email from Node.js',
  text: 'If you receive this email, your Node.js email setup is working correctly!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
