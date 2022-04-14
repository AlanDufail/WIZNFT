//const def
const URLS = {
  BASE_URL: "https://awesome-nft-app.herokuapp.com/",
};
const filterSelect = [
  {
    "id": "1",
    "label": "search"
  },
  {
    "id": "2",
    "label": "creator"
  },
  {
    "id": "3",
    "label": "collection"
  }

];

const content = document.querySelector(".content");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");
const filters = document.querySelector(".filters");
const form = document.querySelector(".form");
const btn_filter = document.querySelector(".btn_filter");
const search = document.querySelector(".search");

console.log();

//variable def
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 5;
let queryUrl = "";


function selectFilter(){
}

function createFilter(){
  filters.innerHTML = '';

  filterSelect.forEach(filter => {
    const btn = document.createElement("div");
    btn.classList.add("btn_filter");
    btn.id = filter.id;
    btn.innerText = filter.label;
    btn.addEventListener("click", addSearchInput);
    filters.appendChild(btn);
    // btn.addEventListener('click', )
  })
}

async function getNFT(url){
  return new Promise(async (success, failed) => {
    await fetch(url) //1
    .then((response) => response.json()) //2
    .then((data) => {
      success(data.assets)
      if(data.assets !== 0){
        console.log('ici');
        displayNFT(data.assets);
      }
    });
  })
}

function displayNFT(data) {
  console.log(data);
  data.forEach((nft) => {
    const { name, description, image_url, sales, id } = nft;
    const nftElm = document.createElement("div");
    console.log(nftElm);
    nftElm.classList.add("nft");
    nftElm.innerHTML = `
           <img src="${image_url}" alt="${name}">
          <div class="nft-info">
              <h3>${name}</h3>
              <span class="${updateSalesColor(sales)}">Nombre de vente: ${sales}</span>
          </div>
          <div class="desc">

              <h3>Description</h3>
              ${description}
              <br/> 
          </div> `;
    content.appendChild(nftElm);
  });
}



function updateSalesColor(sales) {
  if (sales >= 20) {
    return "red";
  } else {
    return "green";
  }
}

function pageCall(page){
  let splitUrl = queryUrl.split('?');
  let queryParams = splitUrl[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = queryUrl + '&page='+page
    displayNFT(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = splitUrl[0] +'?'+ b
    displayNFT(url);
  }
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const mySearch = search.value;
//   if (mySearch) {
//     getNFT(URLS.BASE_URL + NFT_URL +"&query=" + mySearch);
//   } else {
//     getNFT(URLS.BASE_URL + NFT_URL);
//   }
// });
prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
});
next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
});


function addSearchInput(){
  const searchInput = document.createElement("input");
  searchInput.id = "searchbar";
  searchInput.name = "search";
  searchInput.placeholder = "Rechercher par créateur...";
  search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByCreator);


}

async function filterByCreator(){
  let valeurSearch = []
  let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let myData = await getNFT(`https://awesome-nft-app.herokuapp.com/search?q=${input}`);
    for (i = 0; i < myData.length; i++ ) {
      if (!myData[i].creator.username.toLowerCase().includes(input)) {
        //display none
      } else {
        // console.log(myData[i])
        valeurSearch.push(myData[i])
      }
    }
    console.log(valeurSearch)
    deleteNft()
    await displayNFT(valeurSearch)
}

function deleteNft(){
  const allNfts = document.querySelectorAll('.nft');
  allNfts.forEach(nft => {
     nft.remove();
  });
}

//init site



async function initSite() {
  let myData = await getNFT(URLS.BASE_URL);
  createFilter();
  filterByCreator(myData);


}
window.addEventListener("DOMContentLoaded", initSite);
