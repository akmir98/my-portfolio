const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'style')));

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'https://my-portfoli-website.vercel.app',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'style', 'index.html'));
});

// Handle resume download
app.get('/resume', (req, res) => {
  const filePath = path.join(__dirname, 'style', 'resume.pdf');
  const suggestedFileName = 'Your_Resume.pdf';
  res.download(filePath, suggestedFileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// Handle email submission
app.post('/send-email', (req, res) => {
  const { Fullname, emailadress, number, EmailSubject, Message } = req.body;

  console.log('📩 Form Data Received:', {
    Fullname,
    emailadress,
    number,
    EmailSubject,
    Message,
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: emailadress,
    subject: `Portfolio Contact: ${EmailSubject}`,
    text: `
      Full Name: ${Fullname}
      Email Address: ${emailadress}
      Phone Number: ${number}

      Message:
      ${Message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    } else {
      console.log('✅ Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});