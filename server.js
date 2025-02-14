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
// Form Data: Object
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const app = express();
app.use(bodyparser.json()); // Ensure JSON support
app.use(cors());

app.post('/send-email', async (req, res) => {
    try {
        console.log("📩 Form Data Received:", req.body); // Log incoming data

        const { Fullname, emailadress, number, EmailSubject, Message } = req.body;

        if (!Fullname || !emailadress || !number || !EmailSubject || !Message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending to yourself
            subject: `Portfolio Contact: ${EmailSubject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${Fullname}</p>
                <p><strong>Email:</strong> ${emailadress}</p>
                <p><strong>Phone:</strong> ${number}</p>
                <p><strong>Message:</strong> ${Message}</p>
            `,
        };

        console.log("📤 Email Options:", mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);

        res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send email", details: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
