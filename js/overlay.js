
import nftCard from "./nftCard.js";
//overlay function
const overlayContent = document.querySelector('.overlay-content');
const overlay = document.querySelector('.overlay');

function createOverlay(){
  nftCard.createElement(
    "a",
    {
      href: "javascript:void(0)",
      className: "closebtn",
      innerHTML: "&times;",
      events: [
        {
          type: "click",
          action: closeNav,
        }
      ],
    },
    overlay,
  )
}



function openOverlay(nft){
  const id = nft.id;
  fetch(`https://awesome-nft-app.herokuapp.com/nft/${id}`)
  .then((response) => response.json())
  .then(nftInfo => {
    if(nftInfo){
      document.querySelector(".overlay").style.width = "100%";
      const content = `
      <h1 class="content-h1">${nft.name}</h1>
      <div class="content-image">
        <img src=${nft.image_url}>
      </div>
      <div class="content-info">
        <p>Creator: ${nft.creator.username? nft.creator.username : "unknown"}</p>
        <p>Sale's number: ${nft.sales}</p>
      </div>
      <div class="content-collection">
        <h2>${nft.collection.name}</h2>
        <img src=${nft.collection.banner_image_url}>
        <p>${nft.collection.description}</p>
      </div>
      `
      overlayContent.innerHTML = content;
    }
  })
}
function closeNav() {
  document.querySelector(".overlay").style.width = "0%";
}

export default {
  openOverlay,
  closeNav,
  createOverlay,
}