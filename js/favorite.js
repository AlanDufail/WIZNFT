import constants from "./constants.js";
import callsApi from "./calls-api.js";
import nftCard from "./nftCard.js";

function addFavorite(nft) {
    console.log(nft)
    let id = nft.id;
    // console.log(id),
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []


    if(favorites.indexOf(id) == -1) {
        favorites.push(id)
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))

    console.log(JSON.parse(localStorage.getItem('favorites')))
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