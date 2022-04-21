import nftCard from "./nftCard.js";



//init site
async function initSite() {
    let myObject = JSON.parse(localStorage.getItem('favorites'));
    console.log(myObject);
    nftCard.createNFTcard(myObject)

}
window.addEventListener("DOMContentLoaded", initSite);
