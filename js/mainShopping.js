import nftCard from "./nftCard.js";



//init site
async function initSite() {
    let myObject = JSON.parse(localStorage.getItem('cart'));
    console.log(myObject);
    nftCard.createCart(myObject)

}
window.addEventListener("DOMContentLoaded", initSite);
