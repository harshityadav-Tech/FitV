cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = 0;

cart.forEach(item => count += item.quantity);

document.getElementById("cartCount").textContent = count;

const products = [
{
name:"FitV Protein Bar",
desc:"High Energy Snack",
price:20,
image:"images/proteinbar.jpg"
},

{
name:"FitV Whey Protein",
desc:"Gold Chocolate Flavor",
price:2499,
image:"images/whey.jpg"
},

{

name:"FitV Creatine",
desc:"Lab Tested Authentic",
price:899,
image:"images/creatine.jpg"
},

{
name:"FitV Pre Workout",
desc:"Explosive Energy",
price:1299,
image:"images/preworkout.jpg"
},

{
name:"FitV Mass Gainer",
desc:"Build Muscle Faster",
price:3199,
image:"images/mass.jpg"
},

{
name:"FitV BCAA",
desc:"Recovery Support",
price:1499,
image:"images/bcaa.jpg"
},

{
name:"FitV Multivitamin",
desc:"Daily Health Boost",
price:699,
image:"images/vitamin.jpg"
},

{
name:"FitV Shaker Bottle",
desc:"Gym Essential",
price:199,
image:"images/shaker.jpg"
}
];

const allProductsContainer = document.getElementById("allProducts");

if(allProductsContainer){

products.forEach(product => {

allProductsContainer.innerHTML += `
<div class="product-card" onclick="openProduct('${product.name}')">

<img src="${product.image}">
<h3>${product.name}</h3>

<p>${product.desc}</p>

<span>₹${product.price}</span>

<button class="add-to-cart"
data-name="${product.name}"
data-price="${product.price}">
Add to Cart
</button>

</div>
`;

});

}


document.addEventListener("DOMContentLoaded", function(){

const track = document.getElementById("productTrack");

if(track){
products.forEach(product => {

track.innerHTML += `
<div class="product-card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>${product.desc}</p>
<span>₹${product.price}</span>
<button class="add-to-cart"
data-name="${product.name}" 
data-price="${product.price}">
Add to Cart
</button>
</div>
`;

});
}

});


const nextBtn = document.querySelector(".next");
if(nextBtn){
nextBtn.onclick = () => {

track.scrollBy({
left:250,
behavior:"smooth"
});
};
}

const prevBtn = document.querySelector(".prev");
if(prevBtn){
prevBtn.onclick = () => {

track.scrollBy({
left:-250,
behavior:"smooth"
});
};
}


window.addEventListener("scroll", function(){

const navbar = document.querySelector(".navbar")

if(window.scrollY > 50){
navbar.classList.add("scrolled")
}else{
navbar.classList.remove("scrolled")
}

})
function toggleMenu(){

const nav = document.getElementById("navLinks");

nav.classList.toggle("active");

}

let cartCount = 0;

document.addEventListener("click", function(e){
if(e.target.textContent === "Add to Cart"){
cartCount++;
document.getElementById("cartCount").textContent = cartCount;
}
});
cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").textContent = cart.length;

document.addEventListener("click", function(e){

if(e.target.classList.contains("add-to-cart")){

const productName = e.target.dataset.name;
const productPrice = Number(e.target.dataset.price);

const existingItem = cart.find(item => item.name === productName);

if(existingItem){
    existingItem.quantity += 1;
}else{
    cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
    });
}

localStorage.setItem("cart", JSON.stringify(cart));

let count = 0;
cart.forEach(item => count += item.quantity);
document.getElementById("cartCount").textContent = count;}

});


function showCart() {
 
document.getElementById("cartDrawer").classList.add("open");

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

cartItemsContainer.innerHTML = "";

let total = 0;

cart.forEach((item,index) => {

cartItemsContainer.innerHTML += `
<div class="cart-item">
${item.name} ×${item.quantity} - ₹${item.price * item.quantity}
<button onclick="removeItem(${index})">❌</button>
</div>
`;

total += Number(item.price) * Number(item.quantity);

});

cartTotal.textContent = "₹" + total;

}

function closeCart(){
document.getElementById("cartDrawer").classList.remove("open");
}

function removeItem(index){

cart.splice(index,1);

let count = 0;
cart.forEach(item => count += item.quantity);

document.getElementById("cartCount").textContent = count;

showCart();

}


document.getElementById("searchBar").addEventListener("keyup", function(){

const value = this.value.toLowerCase();
const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

const name = card.querySelector("h3").textContent.toLowerCase();

if(name.includes(value)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});


function openProduct(productName){

localStorage.setItem("selectedProduct", productName);

window.location.href = "product.html";

}

const selectedProduct = localStorage.getItem("selectedProduct");

const nameElement = document.getElementById("productName");

if (selectedProduct && nameElement) {

const product = products.find(p => p.name === selectedProduct);

if (product) {

nameElement.textContent = product.name;
document.getElementById("productDesc").textContent = product.desc;
document.getElementById("productPrice").textContent = "₹" + product.price;
document.getElementById("productImage").src = product.image;

}

}


