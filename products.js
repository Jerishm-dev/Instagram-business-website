
/* =====================================================
   CART SYSTEM (LOCAL STORAGE)
===================================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Save Cart */
function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

/* Add Product To Cart */
function addToCart(){

if(!selectedProduct) return;

const size = document.getElementById("detailSize")?.value || "Default";
const quantity = parseInt(document.getElementById("quantity")?.value || 1);
const priceText = document.getElementById("detailPrice").innerText.replace("₹","");

const unitPrice = parseInt(priceText) / quantity;

const item = {
name: selectedProduct.name,
img: selectedProduct.img,
size: size,
quantity: quantity,
price: unitPrice   // store only single item price
};

const existing = cart.find(p => p.name === item.name && p.size === item.size);

if(existing){
existing.quantity += quantity;
}else{
cart.push(item);
}

saveCart();
updateCartCount();
showToast("Added To Cart ✅");
}

/* =====================================================
   PRODUCT DATA
===================================================== */

const products = {

frames:[
{name:"Frame 1",img:"https://picsum.photos/300?1",desc:"Premium frame",price:"₹499"},
{name:"Frame 2",img:"https://picsum.photos/300?2",desc:"Modern frame",price:"₹599"}
],

polaroids:[
{name:"Polaroid 1",img:"https://picsum.photos/300?3",desc:"Vintage polaroid",price:"₹149"}
],

keychains:[
{name:"Keychain 1",img:"https://picsum.photos/300?4",desc:"Custom keychain",price:"₹99"}
]

};

let currentCategory = [];
let selectedProduct = null;
let selectedPrices = {};

function openSecondaryPopup(name, img, desc, prices){

selectedProduct = {
    name: name,
    img: img
};
selectedPrices = prices;

document.getElementById("secImg").src = img;
document.getElementById("secName").innerText = name;
document.getElementById("secDesc").innerText = desc;

const sizeSelect = document.getElementById("secSize");
sizeSelect.innerHTML = "";
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.innerText = "Select Size";
defaultOption.disabled = true;
defaultOption.selected = true;
sizeSelect.appendChild(defaultOption);

Object.keys(prices).forEach(size=>{
    const option = document.createElement("option");
    option.value = size;
    option.innerText = size;
    sizeSelect.appendChild(option);
});

updateSecondaryPrice();

document.getElementById("secondaryPopup").classList.remove("hidden");
}

function closeSecondaryPopup(){
document.getElementById("secondaryPopup").classList.add("hidden");
}

function updateSecondaryPrice(){

const size = document.getElementById("secSize").value;
const price = selectedPrices[size];

document.getElementById("secPrice").innerText = "₹" + price;

}

function openOrderPopup(){

const size = document.getElementById("secSize").value;

if(!size){
    alert("Please select a size");
    return;
}

const price = selectedPrices[size];

const checkoutData = {
    name: selectedProduct.name,
    img: selectedProduct.img,
    size: size,
    price: price
};

// Store temporarily
localStorage.setItem("checkoutItem", JSON.stringify(checkoutData));

// Redirect
window.location.href = "checkout.html";
}


updatePrice();


function closeDetail(){
document.getElementById("detailPopup").classList.add("hidden");
}

/* =====================================================
   SECONDARY POPUP
===================================================== */

document.addEventListener("DOMContentLoaded", function(){

const secondaryClose = document.querySelector(".secondary-close");
document.getElementById("quantity")?.addEventListener("input", updatePrice);
document.addEventListener("DOMContentLoaded", updateCartCount);


/* Close button */
if(secondaryClose){
secondaryClose.onclick = () => {
secondaryPopup.style.display = "none";
};
}

document.getElementById("secondaryPopup")
.addEventListener("click", function (e) {
    if (e.target === this) {
        closeSecondaryPopup();
    }
});

const secondaryPopup = document.getElementById("secondaryPopup");

secondaryPopup.addEventListener("click", function(e) {

    // If click is NOT inside the popup box
    if (!e.target.closest(".detail-box")) {
        closeSecondaryPopup();
    }

});

/* Add View Details Button Automatically 
document.querySelectorAll(".category-product").forEach(card => {

if(card.querySelector(".section-btn")) return;

const btn = document.createElement("button");
btn.innerText = "View Details";
btn.className = "buy-btn section-btn";
btn.style.marginTop = "12px";

card.appendChild(btn);

/* Button Click 
btn.addEventListener("click", function(e){
e.stopPropagation();

const img = card.querySelector("img").src;
const name = card.querySelector("p").innerText;

document.getElementById("secondaryImg").src = img;
document.getElementById("secondaryName").innerText = name;

secondaryPopup.style.display = "flex"

});

});*/

/* Frame Option Change */
const frameOption = document.getElementById("frameOption");

if(frameOption){
frameOption.addEventListener("change", function(){

const orderImg = document.getElementById("orderImg");

if(this.value === "yes"){
orderImg.src = "images/frame-preview.png";
}else{
orderImg.src = originalOrderImage;
}

});
}

});

/* =====================================================
   INSTAGRAM ORDER
===================================================== */

function redirectToInstagram(){

const username = "designed._for._you";

const name = document.getElementById("orderName").innerText;
const productSize = document.getElementById("orderProductSize")?.value || "";
const photoSize = document.getElementById("photoSize")?.value || "";
const frame = document.getElementById("frameOption")?.value || "";

const message = `Hi 👋 I want to order:

Product: ${name}
Product Size: ${productSize}
Photo Size: ${photoSize}
Frame Needed: ${frame}

Please confirm the details.
`;

navigator.clipboard.writeText(message);

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(isMobile){

window.location.href = `instagram://user?username=${username}`;

setTimeout(()=>{
window.open(`https://www.instagram.com/${username}/`,"_blank");
},2000);

}else{
window.open(`https://www.instagram.com/${username}/`,"_blank");
}

alert("Order details copied! Paste it in Instagram DM.");
}

/* =====================================================
   SCROLL
===================================================== */

function scrollToSection(sectionId){

const section = document.getElementById(sectionId);

if(section){
section.scrollIntoView({
behavior:"smooth",
block:"start"
});
}

}

/* =====================================================
   CLOSE SECONDARY (SAFETY)
===================================================== */

function updatePrice(){

const sizeSelect = document.getElementById("detailSize");
const quantityInput = document.getElementById("quantity");
const priceElement = document.getElementById("detailPrice");

if(!sizeSelect || !quantityInput || !priceElement) return;

let selectedSize = sizeSelect.value;
let quantity = parseInt(quantityInput.value) || 1;

let basePrice = currentPrices[selectedSize];

if(!basePrice) return;

let total = basePrice * quantity;

priceElement.innerText = "₹" + total;

}
function showToast(message){

const toast = document.getElementById("toast");

if(!toast) return;

toast.innerText = message;
toast.style.display = "block";

setTimeout(()=>{
toast.style.display = "none";
},2000);

}

function updateCartCount(){
const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").innerText = cart.length;
}

function quickAddToCart(name, img, price){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(item => item.name === name);

if(existing){
existing.quantity += 1;
}else{
cart.push({
name:name,
img:img,
size:"Default",
quantity:1,
price:price
});
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
showToast("Added To Cart ✅");
}

function addSelectedToCart(){

const sizeSelect = document.getElementById("secSize");
const size = sizeSelect.value;

if(!size){
alert("Please select a size");
return;
}

const price = selectedPrices[size];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(item =>
item.name === selectedProduct.name &&
item.size === size
);

if(existing){
existing.quantity += 1;
}else{
cart.push({
name: selectedProduct.name,
img: document.getElementById("secImg").src,
size: size,
quantity: 1,
price: price
});
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
showToast("Added To Cart ✅");

closeSecondaryPopup();
}

// Close popup when clicking outside content
document.getElementById("secondaryPopup")
.addEventListener("click", function (e) {

    if (e.target === this) {
        closeSecondaryPopup();
    }

});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeSecondaryPopup();
    }
});

const authBtn = document.getElementById("authBtn");
const authPopup = document.getElementById("authPopup");
const authTitle = document.getElementById("authTitle");
const authSubmit = document.getElementById("authSubmit");
const switchAuth = document.getElementById("switchAuth");

let isLogin = true;

/* Open Popup */
authBtn.addEventListener("click", () => {
  authPopup.classList.remove("hidden");
});

/* Close Popup */
function closeAuth(){
  authPopup.classList.add("hidden");
}

/* Toggle Login/Signup */
function toggleAuthMode(){

  isLogin = !isLogin;

  if(isLogin){
    authTitle.innerText = "Login";
    authSubmit.innerText = "Login";
    document.querySelector(".switch-text").innerHTML =
      `Don't have an account? <span id="switchAuth">Signup</span>`;
  } else {
    authTitle.innerText = "Signup";
    authSubmit.innerText = "Signup";
    document.querySelector(".switch-text").innerHTML =
      `Already have an account? <span id="switchAuth">Login</span>`;
  }

  document.getElementById("switchAuth")
          .addEventListener("click", toggleAuthMode);
}

switchAuth.addEventListener("click", toggleAuthMode);

/* Submit Logic */
authSubmit.addEventListener("click", () => {

  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  if(!email || !password){
    alert("Please fill all fields");
    return;
  }

  if(isLogin){

    const savedUser = JSON.parse(localStorage.getItem(email));

    if(savedUser && savedUser.password === password){
      alert("Login Successful");
      authBtn.innerText = "Welcome";
      closeAuth();
    } else {
      alert("Invalid Credentials");
    }

  } else {

    localStorage.setItem(email, JSON.stringify({password}));
    alert("Signup Successful. Please Login.");
    toggleAuthMode();

  }

});
