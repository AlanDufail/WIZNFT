import constants from "./constants.js";
import callsApi from "./calls-api.js";
import nftCard from "./nftCard.js";

function addFavorite(nft) {
  const id = nft.id;
    console.log(id),
  

  constants.content.appendChild(iconFav);
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