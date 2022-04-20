import constants from "./constants.js";
import callsApi from "./calls-api.js";
import nftCards from "./nftCard.js";

//filter search function
function createFilter() {

    constants.filters.innerHTML = "";
    constants.filterSelect.forEach((filter) => {
    const btn = document.createElement("div");
    btn.id = filter.id;
    btn.innerText = filter.label;
    if (filter.id == "1") {
      btn.classList.add("btn_filter");
      btn.addEventListener("click", addSearchInput, { once: true });
    }
    if (filter.id == "2") {
      btn.classList.add("btn_filter");
      btn.addEventListener("click", addSearchInputCreator, {once: true});
    }
    if (filter.id == "3") {
      btn.classList.add("btn_filter");
      btn.addEventListener("click", filterBySales);
    }
    constants.filters.appendChild(btn);
    // btn.addEventListener('click', )
  });
}

function addSearchInput() {
  const searchInput = document.createElement("input");
  searchInput.id = "searchbar";
  searchInput.name = "search";
  searchInput.placeholder = "Rechercher par nom...";
  constants.search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByName);
}
function addSearchInputCreator() {
  const searchInput = document.createElement("input");
  searchInput.id = "searchbar";
  searchInput.name = "search";
  searchInput.placeholder = "Rechercher par creator...";
  constants.search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByCreator);
}


async function filterByName() {
  //search  
  let baseData = await callsApi.getNFT(constants.BASE_URL);
  let valeurSearch = [];
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let myData = await callsApi.getNFT(
    `https://awesome-nft-app.herokuapp.com/search?q=${input}`
  );
  console.log(myData)
  for (let i = 0; i < myData.length; i++) {
    if (!myData[i].name.toLowerCase().includes(input)) {
      //display none
    } else {
      valeurSearch.push(myData[i]);
    }
  }
  if(input.length == 0){
    callsApi.deleteNft();
    nftCards.createNFTcard(baseData);
  }
  else {
    callsApi.deleteNft();
    await nftCards.createNFTcard(valeurSearch);
  }
}

async function filterByCreator() {
//search  
  let baseData = await callsApi.getNFT(constants.BASE_URL);
  let valeurSearch = [];
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let myData = await callsApi.getNFT(
    `https://awesome-nft-app.herokuapp.com/search?q=${input}`
  );
  for (let i = 0; i < myData.length; i++) {
    if (!myData[i].creator.username.toLowerCase().includes(input)) {
      //display none
    } else {
      valeurSearch.push(myData[i]);
    }
  }
  if(input.length == 0){
    callsApi.deleteNft();
    nftCards.createNFTcard(baseData);
  }
  else {
    callsApi.deleteNft();
    await nftCards.createNFTcard(valeurSearch);
  }
}

async function filterBySales(page) {
    callsApi.deleteNft();
  await callsApi.getNFT(
    `https://awesome-nft-app.herokuapp.com/?page=${page}&sales=true`
  );
}

export default {
    createFilter,
    filterByName
}