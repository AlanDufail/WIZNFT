import constants from "./constants.js";
import callsApi from "./calls-api.js";
import nftCard from "./nftCard.js";

function addFavorite(nft) {
    console.log(nft)
    let id = nft.id;
    // console.log(id),
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []


    if(favorites.indexOf(nft) == -1) {
        favorites.push(nft)
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
    let myObject = JSON.parse(localStorage.getItem('favorites'))
    nftCard.createNFTcard(myObject)
//   constants.content.appendChild(iconFav);
  fetch(`https://awesome-nft-app.herokuapp.com/nft/${id}`)
    .then((response) => response.json())
    .then((nftInfo) => {
      if (nftInfo) {
        nftCard.createNFTcard(id);
      }
    });
}

export default {
  addFavorite,
};