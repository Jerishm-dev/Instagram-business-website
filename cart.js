
function updateCheckoutVisibility(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutBtn = document.querySelector(".checkout-btn");

    if(cart.length === 0){
        checkoutBtn.style.opacity = "0.5";
        checkoutBtn.style.pointerEvents = "none";
    }
}

document.addEventListener("DOMContentLoaded", updateCheckoutVisibility);

function renderCart(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

cartItems.innerHTML = "";

let total = 0;

cart.forEach(item => {

total += item.price;

const div = document.createElement("div");
div.innerHTML = `
<p>${item.name} (${item.size}) x ${item.quantity}</p>
<p>₹${item.price}</p>
<hr>
`;

cartItems.appendChild(div);

});

cartTotal.innerText = total;
}

document.addEventListener("DOMContentLoaded", renderCart);

function goToCheckout(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  window.location.href = "checkout.html";
}