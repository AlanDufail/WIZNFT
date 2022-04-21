import nftCard from "./nftCard.js";

function addToCart(nft) {
  console.log(nft)
  let id = nft.id;
  // console.log(id),
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  if(cart.indexOf(nft) == -1) {
    cart.push(nft)
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  let myObject = JSON.parse(localStorage.getItem('cart'))
  nftCard.createCart(myObject)
  console.log(myObject)
fetch(`https://awesome-nft-app.herokuapp.com/nft/${id}`)
  .then((response) => response.json())
  .then((nftInfo) => {
    if (nftInfo) {
      nftCard.createCart(id);
    }
  });
};



export default {
    addToCart,
};
