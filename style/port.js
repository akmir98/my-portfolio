// ==============scroll navbar icon===========================
let menuIcon=document.querySelector('#menu-icon')
let nav=document.querySelector('.navbar')
menuIcon.onclick=()=>{
menuIcon.classList.toggle("bx-x")
nav.classList.toggle("active")
};
// =======================scroll===========================
let sections=document.querySelectorAll("section")
let linkbar=document.querySelectorAll("header navb a")

window.onscroll=()=>{
 sections.forEach(sec =>{
    let top =window.scrollY;
    let offset=sec.offsetTop - 150;
    let hight=sec.offsetHeight;
    let id=sec.getAttribute("id")


    if (top >= offset && top< offset + hight) {
        linkbar.forEach(links=>{
           links.classList.remove('active')
           document.querySelector("header nav a[href*='" + id + "']").classList.add('active')
        })
    };
 });

// sticky scroll

let header=document.querySelector("header")

header.classList.toggle('sticky',window.scrollY>100)

// ==========remove the toggle and put navbar==============
menuIcon.classList.remove("bx-x")
nav.classList.remove("active")
};

// =========scroll reveal==============
ScrollReveal({
   //  reset: true, 
    distance: '80px',
    duration:2000,
    delay:200
});
ScrollReveal().reveal('.home-content,.heading',{origin:'top'});

ScrollReveal().reveal('.home-img,.sevicse-contenner,.portfolio-box,.contect form',{origin:'buttom'});
ScrollReveal().reveal('.home-content h1,.img-about',{origin:'left'});
ScrollReveal().reveal('.home-content p,.about-content',{origin:'right'});
// ==============================typed js =================================
const typed=new Typed('.multipal-text',{
   strings:['Frontend Devloper','Guest Posting','JavaScript developer'],
   typeSpeed:100,
   backSpeed:100,
   backDalay:1000,
   loop:true
})
// =============================subment but===================================
document.getElementById('contect').addEventListener('submit', function (event) {
   event.preventDefault(); // Prevent the form from submitting normally
 
   // Simulate sending the message (replace this with actual form submission logic)
   setTimeout(function () {
     // Show the success message pop-up
     document.getElementById('successMessage').style.display = 'block';
   }, 1000); // Simulate a 1-second delay
 });
 
 // Close the pop-up when the close button is clicked
 document.getElementById('closePopup').addEventListener('click', function () {
   document.getElementById('successMessage').style.display = 'none';
 });




 document.querySelector('form').addEventListener('submit', function (event) {
   event.preventDefault(); // Prevent the default form submission
 
   // Log form data for debugging
   const formData = new FormData(event.target);
   const data = Object.fromEntries(formData.entries());
   console.log('Form Data:', data);
 
   // Send the form data to the backend
   fetch('/send-email', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
     .then((response) => response.json())
     .then((result) => {
       console.log('Success:', result);
       // Show success message
       document.getElementById('successMessage').style.display = 'block';
     })
     .catch((error) => {
       console.error('Error:', error);
       alert('Failed to send message. Please try again.');
     });
 });