import constants from "./constants.js";
import callsApi from "./calls-api.js";

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
      btn.addEventListener("click", console.log("Filter by creator"));
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

async function filterByName() {
  //search  
  let baseData = await callsApi.getNFT(constants.BASE_URL);
  let valeurSearch = [];
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let myData = await callsApi.getNFT(
    `https://awesome-nft-app.herokuapp.com/search?q=${input}`
  );
  console.log(...myData);
  for (let i = 0; i < myData.length; i++) {
    if (!myData[i].creator.username.toLowerCase().includes(input)) {
      //display none
    } else {
      valeurSearch.push(myData[i]);
    }
  }
  if(input.length == 0){
    callsApi.deleteNft();
    callsApi.getNFT(baseData)
  }
  else {
    deleteNft();
    await callsApi.getNFT(valeurSearch);
  }
}

async function filterByCreator() {
  //TODO YANIS
}

async function filterBySales(page) {
    callsApi.deleteNft();
  await callsApi.getNFT(
    `https://awesome-nft-app.herokuapp.com/?page=${page}&sales=true`
  );
}

export default {
    createFilter,
}