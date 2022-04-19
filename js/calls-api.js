import constants from "./constants.js";
import lazyLoading from "./lazyLoader.js";
import nftCards from "./nftCard.js";



const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");

let currentPage = 1;
let nextPage = 1;
let prevPage = 0;
let totalPages = 20;


async function getNFT(url) {
  lazyLoading.lazyLoading();
  await fetch(url) //1
    .then((response) => response.json()) //2
    .then((data) => {
      deleteNft();
      if (data.assets.length !== 0) {
        nftCards.createNFTcard(data.assets);
        if (currentPage <= 1) {
          previous.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          previous.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          previous.classList.remove("disabled");
          next.classList.remove("disabled");
        }
        constants.filters.scrollIntoView({ behavior: "smooth" });
      } else {
        content.innerHTML = `<h1 class="no-results">${constants.errorMessage[2].label}</h1>`;
      }
    });
}


function deleteNft() {
  const allNfts = document.querySelectorAll(".nft");
  allNfts.forEach((nft) => {
    nft.remove();
  });

  console.log(nftCards);
}
async function selectPage(page) {
  deleteNft();
  await getNFT(`https://awesome-nft-app.herokuapp.com/?page=${page}`);
}

previous.addEventListener("click", () => {
  if (prevPage >= 1) {
    prevPage -= 1;
    nextPage -= 1;
    currentPage -= 1;
    current.innerHTML = currentPage;
    selectPage(currentPage);
  }
});
next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    prevPage += 1;
    nextPage += 1;
    currentPage += 1;
    current.innerHTML = currentPage;
    selectPage(currentPage);
  }
});

export default {
  getNFT,
  deleteNft,
};
