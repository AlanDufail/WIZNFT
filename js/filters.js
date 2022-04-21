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
      btn.addEventListener("click", addSearchInput);
    }
    if (filter.id == "2") {
      btn.classList.add("btn_filter");
      btn.addEventListener("click", addSearchInputCreator);
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
  if(document.querySelector("input[name=search]")) {
    document.getElementById("searchbar").remove(); 
  }
  if(document.querySelector("input[name=searchbar]")) {
    document.getElementById("searchbarCreator").remove(); 
  }
  const searchInput = document.createElement("input");
  searchInput.id = "searchbar";
  searchInput.name = "search";
  searchInput.placeholder = "Rechercher par nom...";
  constants.search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByName);
}
function addSearchInputCreator() {
  if(document.querySelector("input[name=searchbar]")) {
    document.getElementById("searchbarCreator").remove(); 
  }
  if(document.querySelector("input[name=search]")) {
    document.getElementById("searchbar").remove(); 
  }
  const searchInput = document.createElement("input");
  searchInput.id = "searchbarCreator";
  searchInput.name = "searchbar";
  searchInput.placeholder = "Rechercher par creator...";
  constants.search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByCreator);
}


async function filterByName() {
  //search  
  let baseData = await callsApi.getNFTs(constants.BASE_URL);
  let valeurSearch = [];
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let myData = await callsApi.getNFTs(
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
  let baseData = await callsApi.getNFTs(constants.BASE_URL);
  let valeurSearch = [];
  let input = document.getElementById("searchbarCreator").value;
  input = input.toLowerCase();
  let myData = await callsApi.getNFTs(
    `https://awesome-nft-app.herokuapp.com/search?q=${input}`
  );
  console.log(input)

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
  await callsApi.getNFTs(
    `https://awesome-nft-app.herokuapp.com/?page=${page}&sales=true`
  );
}

export default {
    createFilter,
    filterByName,
    filterByCreator,
    filterBySales,
}