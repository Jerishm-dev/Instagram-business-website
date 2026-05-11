gsap.registerPlugin(ScrollTrigger);

/* ===================================
   HERO PANEL SCROLL REVEAL (UNCHANGED)
=================================== */

let tl = gsap.timeline({
  scrollTrigger:{
    trigger:".hero-wrapper",
    start:"top top",
    end:"+=3000",
    scrub:true,
    pin:true,
    anticipatePin:1
  }
});


tl.to(".panel2",{ clipPath:"inset(0% 0 0 0)" })
  .to(".panel3",{ clipPath:"inset(0% 0 0 0)" })
  .to(".panel4",{ clipPath:"inset(0% 0 0 0)" })
  .to(".gradient-text",{
  backgroundPosition:"100% 50%",
  ease:"none"
},0);
  


/* ===================================
   PRODUCT CARDS SCROLL
=================================== */

gsap.from(".card",{
  scrollTrigger:{
    trigger:".products",
    start:"top 80%"
  },
  opacity:0,
  y:100,
  stagger:0.2
});


/* ===================================
   PARALLAX BACKGROUND
=================================== */

gsap.to(".parallax",{
  backgroundPosition:"50% 100%",
  ease:"none",
  scrollTrigger:{
    trigger:".parallax",
    start:"top bottom",
    end:"bottom top",
    scrub:true
  }
});


/* ===================================
   TESTIMONIAL REVEAL
=================================== */

gsap.to(".testimonial",{
  scrollTrigger:{
    trigger:".testimonial",
    start:"top 80%"
  },
  opacity:1,
  y:0,
  duration:1
});


/* ===================================
   MAGNETIC BUTTON
=================================== */

const btn = document.querySelector(".cta-btn");

if(btn){

   btn.addEventListener("mousemove",(e)=>{

      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;

      gsap.to(btn,{ x:x*0.2, y:y*0.2 });

   });

}



/* ===================================
   FLOATING ITEMS (RESTORED + IMPROVED)
=================================== */

gsap.utils.toArray(".float-item").forEach(el => {

  gsap.to(el,{
    y:"+=40",
    x:"+=20",
    duration: gsap.utils.random(4,7),
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
  });

});


/* ===================================
   MOUSE PARALLAX DEPTH (FIXED)
=================================== */

document.addEventListener("mousemove",(e)=>{

  let x = (e.clientX / window.innerWidth) - 0.5;
  let y = (e.clientY / window.innerHeight) - 0.5;

  // floating icons move
  gsap.to(".float-item",{
    x: i => x * 40 * (i+1),
    y: i => y * 40 * (i+1),
    duration:1.2,
    ease:"power3.out"
  });

  // depth layers if added later
  gsap.to(".depth-large",{ x:x*80, y:y*80, duration:1 });
  gsap.to(".depth-medium",{ x:x*40, y:y*40, duration:1 });
  gsap.to(".depth-small",{ x:x*20, y:y*20, duration:1 });

});


/* ===================================
   HEART COLOR PULSE
=================================== */

gsap.to(".heart",{
  backgroundColor:"#ffffff",
  repeat:-1,
  yoyo:true,
  duration:2
});


/* ===================================
   POLAROID 3D HOVER TILT
=================================== */

document.querySelectorAll(".polaroid").forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card,{
      rotationX: rotateX,
      rotationY: rotateY,
      scale:1.05,
      transformPerspective:600,
      duration:0.3
    });

  });

  card.addEventListener("mouseleave",()=>{

    gsap.to(card,{
      rotationX:0,
      rotationY:0,
      scale:1,
      duration:0.4
    });

  });

});

/* ===================================
   APPLE STYLE GRADIENT HOVER
=================================== */

document.querySelectorAll(".gradient-text").forEach(text => {

  text.addEventListener("mousemove",(e)=>{

    const rect = text.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(text,{
      backgroundPosition: `${x*100}% ${y*100}%`,
      duration:0.3,
      ease:"power2.out"
    });

  });

  text.addEventListener("mouseleave",()=>{

    gsap.to(text,{
      backgroundPosition:"50% 50%",
      duration:1,
      ease:"power3.out"
    });

  });

});

const orderBtn = document.querySelector(".cta-btn");
const popup = document.querySelector(".order-popup");
const popupCard = document.querySelector(".popup-card");

orderBtn.addEventListener("click", () => {

popup.style.pointerEvents = "auto";

gsap.to(popup,{
opacity:1,
duration:0.4
});

gsap.to(popupCard,{
scale:1,
opacity:1,
duration:0.6,
ease:"back.out(1.7)"
});

});

document.querySelector(".popup-close").addEventListener("click", closePopup);
document.querySelector(".popup-overlay").addEventListener("click", closePopup);

function closePopup(){

gsap.to(popupCard,{
scale:0.8,
opacity:0,
duration:0.4
});

gsap.to(popup,{
opacity:0,
duration:0.4,
onComplete:()=> popup.style.pointerEvents="none"
});

}

gsap.utils.toArray(".popup-item").forEach(icon => {

gsap.to(icon,{
y:"+=15",
duration:2 + Math.random(),
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});

});

gsap.to(".orb1",{
x:100,
y:60,
duration:8,
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});

gsap.to(".orb2",{
x:-120,
y:-80,
duration:10,
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});

gsap.to(".blob1",{
x:80,
y:60,
duration:12,
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});

gsap.to(".blob2",{
x:-80,
y:-60,
duration:14,
repeat:-1,
yoyo:true,
ease:"sine.inOut"
});

gsap.to(".products-section::before", {
x: 120,
y: 80,
duration: 12,
repeat: -1,
yoyo: true,
ease: "sine.inOut"
});

/* ======================================
   NEON PARTICLES (Mouse Reactive)
====================================== */

const container = document.querySelector(".neon-particles");

let particles = [];

for(let i=0;i<35;i++){

  const p = document.createElement("div");
  p.classList.add("particle");

  let x = Math.random()*window.innerWidth;
  let y = Math.random()*window.innerHeight;

  gsap.set(p,{x,y});

  container.appendChild(p);

  particles.push({
    el:p,
    x,
    y,
    speedX: gsap.utils.random(-0.3,0.3),
    speedY: gsap.utils.random(-0.3,0.3)
  });
}


/* floating motion */

gsap.ticker.add(()=>{

particles.forEach(p=>{

p.x += p.speedX;
p.y += p.speedY;

gsap.set(p.el,{x:p.x,y:p.y});

});

});


/* mouse interaction */

document.addEventListener("mousemove",(e)=>{

let mx = e.clientX;
let my = e.clientY;

particles.forEach(p=>{

let dx = p.x - mx;
let dy = p.y - my;

let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 150){

gsap.to(p.el,{
x: "+=" + dx*0.08,
y: "+=" + dy*0.08,
duration:0.6,
ease:"power2.out"
});

}

});

});

const neon = document.querySelector(".neon-bg");

document.addEventListener("mousemove",(e)=>{

const x = e.clientX;
const y = e.clientY;

gsap.to(".neon-bg::before",{
duration:1
});

gsap.to(neon,{

x:(x - window.innerWidth/2) * 0.2,
y:(y - window.innerHeight/2) * 0.2,

ease:"power3.out",
duration:1.2

});

});

/* ======================================
   STEP CARDS 3D HOVER EFFECT
====================================== */

document.querySelectorAll(".step").forEach(card => {

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width/2;
const centerY = rect.height/2;

const rotateX = (y - centerY) / 12;
const rotateY = (centerX - x) / 12;

gsap.to(card,{
rotationX:rotateX,
rotationY:rotateY,
scale:1.05,
transformPerspective:600,
duration:0.3,
ease:"power2.out"
});

});

card.addEventListener("mouseleave",()=>{

gsap.to(card,{
rotationX:0,
rotationY:0,
scale:1,
duration:0.5,
ease:"power3.out"
});

});

});

gsap.to(".reviews-track",{
y:"-50%",
duration:20,
ease:"none",
repeat:-1
});

function scrollToSection(id){

document.getElementById(id).scrollIntoView({

behavior: "smooth",
block: "start"

});

}

function goBack(){

    if(document.referrer !== ""){
        window.history.back();
    } else {
        window.location.href = "index.html"; // change if your main page name different
    }

}

/* =========================================
   ADD BUTTON TO SEPARATE PRODUCT CARDS
========================================= */

document.querySelectorAll(".category-product").forEach(card => {

    // Avoid duplicate button
    if (card.querySelector(".section-btn")) return;

    const btn = document.createElement("button");
    btn.innerText = "View Details";
    btn.classList.add("buy-btn", "section-btn");
    btn.style.marginTop = "12px";

    card.appendChild(btn);

});

/* =========================================
   SECONDARY POPUP FOR SEPARATE SECTION
========================================= */

document.addEventListener("click", function(e){

    if(e.target.classList.contains("section-btn")){

        const card = e.target.closest(".category-product");

        const img = card.querySelector("img").src;
        const name = card.querySelector("p").innerText;

        document.getElementById("secondaryImg").src = img;
        document.getElementById("secondaryName").innerText = name;

        document.getElementById("secondaryPopup").style.display = "flex";
    }

});

document.querySelector(".secondary-close").onclick = function(){
    document.getElementById("secondaryPopup").style.display = "none";
};

window.addEventListener("click", function(e){
    if(e.target === document.getElementById("secondaryPopup")){
        document.getElementById("secondaryPopup").style.display = "none";
    }
});

function buyNow(){

    // Get preview data
    const img = document.getElementById("secondaryImg").src;
    const name = document.getElementById("secondaryName").innerText;

    // Set order popup data
    document.getElementById("orderImg").src = img;
    document.getElementById("orderName").innerText = name;

    // Hide secondary popup
    document.getElementById("secondaryPopup").style.display = "none";

    // Show order popup
    document.getElementById("orderPopup").classList.remove("hidden");
}

let originalOrderImage = "";

function buyNow(){

    const img = document.getElementById("secondaryImg").src;
    const name = document.getElementById("secondaryName").innerText;

    originalOrderImage = img;

    document.getElementById("orderImg").src = img;
    document.getElementById("orderName").innerText = name;

    document.getElementById("secondaryPopup").style.display = "none";
    document.getElementById("orderPopup").classList.remove("hidden");
}

document.getElementById("frameOption").addEventListener("change", function(){

    const orderImg = document.getElementById("orderImg");

    if(this.value === "yes"){
        orderImg.src = "images/frame-preview.png"; 
    } else {
        orderImg.src = originalOrderImage;
    }

});

function redirectToInstagram(){
    window.open("https://instagram.com/YOUR_USERNAME", "_blank");
}

/* ===============================
   POPUP AUTH SYSTEM
================================= */

let isLogin = true;

authBtn.addEventListener("click", () => {

  const user = localStorage.getItem("loggedInUser");

  if(user){
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    location.reload();
    return;
  }

  authPopup.classList.add("active");
});

authOverlay.addEventListener("click", closeAuth);
authClose.addEventListener("click", closeAuth);

function closeAuth(){
  authPopup.classList.remove("active");
}

switchAuth.addEventListener("click", toggleAuthMode);

function toggleAuthMode(){

  isLogin = !isLogin;

  const nameField = document.getElementById("authName");
  const phoneField = document.getElementById("authPhone");
  const addressField = document.getElementById("authAddress");

  if(isLogin){
    authTitle.innerText = "Login";
    authSubmit.innerText = "Login";
    switchAuth.innerText = "Signup";

    nameField.style.display = "none";
    phoneField.style.display = "none";
    addressField.style.display = "none";

  } else {
    authTitle.innerText = "Signup";
    authSubmit.innerText = "Signup";
    switchAuth.innerText = "Login";

    nameField.style.display = "block";
    phoneField.style.display = "block";
    addressField.style.display = "block";
  }
}

authSubmit.addEventListener("click", () => {

  const name = document.getElementById("authName").value;
  const email = document.getElementById("authEmail").value;
  const phone = document.getElementById("authPhone").value;
  const address = document.getElementById("authAddress").value;
  const password = document.getElementById("authPassword").value;

  if(!email || !password){
    alert("Please fill required fields");
    return;
  }

  if(isLogin){

    const savedUser = JSON.parse(localStorage.getItem(email));

    if(savedUser && savedUser.password === password){
      localStorage.setItem("loggedInUser", email);
      alert("Login Successful!");
      closeAuth();
      updateNavbar();
    } else {
      alert("Invalid Credentials");
    }

  } else {

    if(!name || !phone || !address){
      alert("Please fill all fields");
      return;
    }

    if(localStorage.getItem(email)){
      alert("User already exists");
      return;
    }

    const userData = { name, email, phone, address, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Signup successful! Please login.");
    toggleAuthMode();
  }
});

function updateNavbar(){
  const user = localStorage.getItem("loggedInUser");
  authBtn.innerText = user ? "Logout" : "Login / Signup";
}

updateNavbar();

/* Switch Login / Signup */
switchAuth.addEventListener("click", toggleAuthMode);

function toggleAuthMode(){

  isLogin = !isLogin;

  const nameField = document.getElementById("authName");
  const phoneField = document.getElementById("authPhone");
  const addressField = document.getElementById("authAddress");

  if(isLogin){
    authTitle.innerText = "Login";
    authSubmit.innerText = "Login";
    switchAuth.innerText = "Signup";

    nameField.style.display = "none";
    phoneField.style.display = "none";
    addressField.style.display = "none";

  } else {
    authTitle.innerText = "Signup";
    authSubmit.innerText = "Signup";
    switchAuth.innerText = "Login";

    nameField.style.display = "block";
    phoneField.style.display = "block";
    addressField.style.display = "block";
  }
}

/* Submit Login / Signup */
authSubmit.addEventListener("click", () => {

  const name = document.getElementById("authName")?.value;
  const email = document.getElementById("authEmail").value;
  const phone = document.getElementById("authPhone")?.value;
  const address = document.getElementById("authAddress")?.value;
  const password = document.getElementById("authPassword").value;

  if(!email || !password){
    alert("Please fill required fields");
    return;
  }

  if(isLogin){

    const savedUser = JSON.parse(localStorage.getItem(email));

    if(savedUser && savedUser.password === password){

      localStorage.setItem("loggedInUser", email);
      alert("Login Successful!");
      closeAuth();
      updateNavbar();

    } else {
      alert("Invalid Credentials");
    }

  } else {

    if(localStorage.getItem(email)){
      alert("User already exists. Please login.");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      address,
      password
    };

    localStorage.setItem(email, JSON.stringify(userData));
    alert("Signup Successful! Please Login.");
    toggleAuthMode();
  }

});

/* Update Navbar */
function updateNavbar(){

  const user = localStorage.getItem("loggedInUser");

  if(user){
    authBtn.innerText = "Logout";             
  } else {
    authBtn.innerText = "Login";
  }

}

/* Check on page load */
updateNavbar();

document.addEventListener("DOMContentLoaded", function(){

  const authBtn = document.getElementById("authBtn");
  const authPopup = document.querySelector(".auth-popup");
  const authClose = document.querySelector(".auth-close");
  const authOverlay = document.querySelector(".auth-overlay");

  authBtn.addEventListener("click", () => {
    authPopup.classList.add("active");
    authOverlay.classList.add("active");
  });

  authClose.addEventListener("click", closeAuth);
  authOverlay.addEventListener("click", closeAuth);

  function closeAuth(){
    authPopup.classList.remove("active");
    authOverlay.classList.remove("active");
  }

});