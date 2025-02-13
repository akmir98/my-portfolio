// // ==============scroll navbar icon===========================
// let menuIcon=document.querySelector('#menu-icon')
// let nav=document.querySelector('.navbar')
// menuIcon.onclick=()=>{
// menuIcon.classList.toggle("bx-x")
// nav.classList.toggle("active")
// };
// // =======================scroll===========================
// let sections=document.querySelectorAll("section")
// let linkbar=document.querySelectorAll("header navb a")

// window.onscroll=()=>{
//  sections.forEach(sec =>{
//     let top =window.scrollY;
//     let offset=sec.offsetTop - 150;
//     let hight=sec.offsetHeight;
//     let id=sec.getAttribute("id")


//     if (top >= offset && top< offset + hight) {
//         linkbar.forEach(links=>{
//            links.classList.remove('active')
//            document.querySelector("header nav a[href*='" + id + "']").classList.add('active')
//         })
//     };
//  });

// // sticky scroll

// let header=document.querySelector("header")

// header.classList.toggle('sticky',window.scrollY>100)

// // ==========remove the toggle and put navbar==============
// menuIcon.classList.remove("bx-x")
// nav.classList.remove("active")
// };

// // =========scroll reveal==============
// ScrollReveal({
//    //  reset: true, 
//     distance: '80px',
//     duration:2000,
//     delay:200
// });
// ScrollReveal().reveal('.home-content,.heading',{origin:'top'});

// ScrollReveal().reveal('.home-img,.sevicse-contenner,.portfolio-box,.contect form',{origin:'buttom'});
// ScrollReveal().reveal('.home-content h1,.img-about',{origin:'left'});
// ScrollReveal().reveal('.home-content p,.about-content',{origin:'right'});
// // ==============================typed js =================================
// const typed=new Typed('.multipal-text',{
//    strings:['Frontend Devloper','Guest Posting','JavaScript developer'],
//    typeSpeed:100,
//    backSpeed:100,
//    backDalay:1000,
//    loop:true
// })
// // =============================subment but===================================
// document.getElementById('contect').addEventListener('submit', function (event) {
//    event.preventDefault(); // Prevent the form from submitting normally
 
//    // Simulate sending the message (replace this with actual form submission logic)
//    setTimeout(function () {
//      // Show the success message pop-up
//      document.getElementById('successMessage').style.display = 'block';
//    }, 1000); // Simulate a 1-second delay
//  });
 
//  // Close the pop-up when the close button is clicked
//  document.getElementById('closePopup').addEventListener('click', function () {
//    document.getElementById('successMessage').style.display = 'none';
//  });
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); // Load environment variables
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static(path.join(__dirname, 'style')));
app.use(bodyparser.json()); // ✅ Added JSON support
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://my-portfoli-website.vercel.app', // Your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'style/index.html'));
});

// Route to download the resume
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

console.log('✅ Email User:', process.env.EMAIL_USER);
console.log('✅ Email Pass:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Found');
console.log('✅ Port:', process.env.PORT || 3000);

app.post('/send-email', function (req, res) {
  // Extract form data
  const FullName = req.body.Fullname;
  const emailAddress = req.body.emailadress;
  const phoneNumber = req.body.number;
  const emailSubject = req.body.EmailSubject;
  const message = req.body.Message;

  console.log('📩 Form Data Received:', {
    FullName,
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

  console.log('✅ Transporter configured with:', {
    service: 'gmail',
    user: process.env.EMAIL_USER,
  });

  // Email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // ✅ Send to yourself
    replyTo: emailAddress, // ✅ Allows replying to the user
    subject: `Portfolio Contact: ${emailSubject}`,
    text: `
      Full Name: ${FullName}
      Email Address: ${emailAddress}
      Phone Number: ${phoneNumber}

      Message:
      ${message}
    `,
  };

  console.log('📤 Email Options:', mailOptions);

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('❌ Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    } else {
      console.log('✅ Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
