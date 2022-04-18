//const def
const URLS = {
  BASE_URL: "https://awesome-nft-app.herokuapp.com/?page=0&sales=false",
  
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
const filters = document.querySelector(".filters");
const form = document.querySelector(".form");
const btn_filter = document.querySelector(".btn_filter");
const search = document.querySelector(".search");
//variable def
let currentPage = 0;
let nextPage = 1;
let prevPage = -1;
let totalPages = 20;
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
    btn.addEventListener("click", addSearchInput, {once: true});
    filters.appendChild(btn);
    // btn.addEventListener('click', )
  })
}
async function getNFT(url){
  console.log(url);
  return new Promise(async (success, failed) => {
    await fetch(url) //1
    .then((response) => response.json()) //2
    .then((data) => {
      success(data.assets)
      if(data.assets.length !== 0){
        displayNFT(data.assets);
        if(currentPage <= 0){
          prev.classList.add('disabled');
          next.classList.remove('disabled')
        }else if(currentPage >= totalPages){
          prev.classList.remove('disabled');
          next.classList.add('disabled')
        }else{
          prev.classList.remove('disabled');
          next.classList.remove('disabled')
        }
        filters.scrollIntoView({behavior : 'smooth'});
      }else{
        content.innerHTML= `<h1 class="no-results">No Results Found</h1>`
      }
    });
  })
}


function displayNFT(data) {
  data.forEach((nft) => {
    const { name, description, image_url, sales, creator,id } = nft;
    const nftElm = document.createElement("div");
    nftElm.classList.add("nft");




    nftElm.innerHTML = `
           <img src="${image_url? image_url : "./Assets/Image/image_not_found.png"}" alt="${name}">
          <div class="nft-info">
              <h3>${name? name : "Item no longer available"}</h3>
              <p>Creator: ${creator.username? creator.username : "unknown"}</p>
              <span class="${updateSalesColor(sales)}">Nombre de vente: ${sales}</span>
          </div>
          <div class="desc">
              <h3>Description</h3>
              <a id="addFav">Ajouter aux favoris</a>
              ${description? description : "No description available"}
              <br/> 
          </div> `;
    content.appendChild(nftElm);




    let exportFavoris = {
      name    : name,
      desc    : description, 
      img_url : image_url,
      sales   : sales,
      id      : id
  };



  let addFav = document.getElementById('addFav');
  
  addFav.onclick = function() {
    localStorage.setItem(nft, JSON.stringify(exportFavoris));
    console.log("Hello");
}


function getLocalStorage(){
  Object.keys(localStorage).forEach(function(key, value){
      let mydata = JSON.parse(localStorage.getItem(key));
      const nftElm = document.createElement("div");
      nftElm.classList.add("nft");
      nftElm.innerHTML = `<div style="display : flex; flex-direction :column; align-items : center; width : fit-content; box-sizing : border-box; padding : 16px;" >`+ mydata.id+ `<img src="` + mydata.img_url +`"></img>` + `<a id="addFav">Supprimer des favoris</a></div>`;
      fav.appendChild(nftElm);
    getLocalStorage(); 
  });
}

console.log(localStorage);


  });
}
function updateSalesColor(sales) {
  if (sales >= 20) {
    return "red";
  } else {
    return "green";
  }
}
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
        valeurSearch.push(myData[i])
      }
    }
    deleteNft()
    await displayNFT(valeurSearch)
}
async function selectPage(page){
  console.log(page);
  deleteNft();
  await getNFT(`https://awesome-nft-app.herokuapp.com/?page=${page}&sales=false`);
}
function deleteNft(){
  const allNfts = document.querySelectorAll('.nft');
  allNfts.forEach(nft => {
     nft.remove();
  });
}
function onClick(id, callback) {
  document.getElementById(id).addEventListener("click", callback);
}
previous.addEventListener('click', () => {
  if(prevPage >= 0){
    prevPage -= 1;
    nextPage -= 1;
    currentPage -= 1;
    selectPage(currentPage);
  }
});
next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    prevPage += 1;
    nextPage += 1;
    currentPage += 1;
    selectPage(currentPage);
  }
});
//init site
async function initSite() {
  let myData = await getNFT(URLS.BASE_URL);
  createFilter();
  filterByCreator(myData);
}
window.addEventListener("DOMContentLoaded", initSite);
