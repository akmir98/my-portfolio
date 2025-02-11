// const express = require('express');
// const bodyparser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config(); // Load environment variables
// const nodemailer = require('nodemailer');

// const app = express();
// app.use(express.static(path.join(__dirname, 'style')));
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'https://my-portfoli-website.vercel.app', // Your frontend URL
//   methods: 'GET,POST',
//   allowedHeaders: 'Content-Type',
// }));

// app.get('/api/data', (req, res) => {
//   res.json({ message: "CORS issue fixed!" });
// });



// // app.get('/', function (req, res) {
// //    res.sendFile(path.join(__dirname, 'style', 'index.html'));
// // });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'style/index.html'));
// });

// // Route to download the resume
// app.get('/resume', function (req, res) {
//   const filePath = path.join(__dirname, 'style/resume.pdf'); // Path to the file
//   const suggestedFileName = 'Your_Resume.pdf'; // Name suggested to the user
//   res.download(filePath, suggestedFileName, (err) => {
//     if (err) {
//       console.error('Error downloading file:', err);
//       res.status(500).send('Error downloading file');
//     }
//   });
// });

// console.log('Email User:', process.env.EMAIL_USER);
// console.log('Email Pass:', process.env.EMAIL_PASS);
// console.log('Port:', process.env.PORT);

// 
// app.post('/', function (req, res) {
//   // Extract form data
//   const fullName = req.body.Fullname;
//   const emailAddress = req.body.emailadress;
//   const phoneNumber = req.body.number;
//   const emailSubject = req.body.EmailSubject;
//   const message = req.body.Message;

//   // Log form data to the console (for debugging)
//   console.log('Form Data:', {
//     fullName,
//     emailAddress,
//     phoneNumber,
//     emailSubject,
//     message,
//   });

//   // Create a Nodemailer transporter
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Log transporter configuration
//   console.log('Transporter configured with:', {
//     service: 'gmail',
//     user: process.env.EMAIL_USER,
//   });

//   // Email options
//   var mailOptions = {
//     from: process.env.EMAIL_USER, // Sender address
//     to: emailAddress, // Recipient address (from the form)
//     cc: process.env.EMAIL_USER, // CC yourself
//     subject: emailSubject, // Email subject (from the form)
//     text: `
//       Full Name: ${fullName}
//       Email Address: ${emailAddress}
//       Phone Number: ${phoneNumber}
//       Message: ${message}
//     `, // Email body
//   };

//   // Log email options
//   console.log('Email Options:', mailOptions);

//   // Send the email
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.redirect('/');
//     }
//   });
// })

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static(path.join(__dirname, 'style')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// Basic routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/resume', function (req, res) {
  const filePath = path.join(__dirname, 'style/resume.pdf');
  const suggestedFileName = 'Your_Resume.pdf';
  res.download(filePath, suggestedFileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// Email handling
app.post('/', async function (req, res) {
  try {
    const { Fullname, emailadress, number, EmailSubject, Message } = req.body;

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Make sure this is an App Password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailadress, // Using the email from the form
      cc: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${EmailSubject}`,
      text: `
        New contact form submission:
        
        Name: ${Fullname}
        Email: ${emailadress}
        Phone: ${number}
        Subject: ${EmailSubject}
        
        Message:
        ${Message}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});