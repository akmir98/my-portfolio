// const express = require('express');
// const bodyparser = require('body-parser');
// const path = require('path'); // Add this line
// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables
// const nodemailer = require('nodemailer');


// const app = express();
// app.use(express.static('style'));
// app.use(bodyparser.urlencoded({ extended: true }));


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/port.html');
// });

// app.get('/resume', function (req, res) {
//   const filePath = path.join(__dirname, 'style/resume.pdf'); // Path to the file on your server
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

// app.post('/', function (req, res) {
//   const comn = req.body.Message;
//   const na = req.body.Fullname;

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   var mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: req.body.username,
//     cc: process.env.EMAIL_USER,
//     subject: 'Thanks for your feedback ' + na,
//     text: 'Thanks for your message: ' + comn,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending email');
//     } else {
//       res.redirect('/');
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, function () {
//   console.log('Server is running on port ' + PORT);
// });
const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); // Load environment variables
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static(path.join(__dirname, 'style')));
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Route to download the resume
app.get('/resume', function (req, res) {
  const filePath = path.join(__dirname, 'style/resume.pdf'); // Path to the file
  const suggestedFileName = 'Your_Resume.pdf'; // Name suggested to the user
  res.download(filePath, suggestedFileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);
console.log('Port:', process.env.PORT);

app.post('/', function (req, res) {
  // Extract form data
  const fullName = req.body.Fullname;
  const emailAddress = req.body.emailadress;
  const phoneNumber = req.body.number;
  const emailSubject = req.body.EmailSubject;
  const message = req.body.Message;

  // Log form data to the console (for debugging)
  console.log('Form Data:', {
    fullName,
    emailAddress,
    phoneNumber,
    emailSubject,
    message,
  });

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  var mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: emailAddress, // Recipient address (from the form)
    cc: process.env.EMAIL_USER, // CC yourself
    subject: emailSubject, // Email subject (from the form)
    text: `
      Full Name: ${fullName}
      Email Address: ${emailAddress}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `, // Email body
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      res.redirect('/');
      console.log('Email sent: ' + info.response);
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});