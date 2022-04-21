import constants from "./constants.js";
import callsApi from "./calls-api.js";
import nftCard from "./nftCard.js";

function addFavorite(nft) {
  const id = nft.id;
  const favImage = document.querySelector(".icon-fav");
  favImage.src = "../Assets/Image/star-full.svg";
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
