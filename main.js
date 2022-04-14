//const def
const URLS = {
  NEW_URL: "https://awesome-nft-app.herokuapp.com/",
};

const content = document.querySelector(".content");
const search = document.querySelector(".search");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");
const form = document.querySelector(".form");

//variable def
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 5;
let queryUrl = "";

async function getNFT(url){
  return new Promise(async (success, failed) => {
    await fetch(url) //1
    .then((response) => response.json()) //2
    .then((data) => {
      success(data.assets)
      if(data.assets !== 0){
        displayNFT(data.assets);
      }
    });
  })
}

function displayNFT(data) {
  data.forEach((nft) => {
    const { name, description, image_url, sales, id } = nft;
    const nftElm = document.createElement("div");
    nftElm.classList.add("nft");
    nftElm.innerHTML = `
           <img src="${image_url}" alt="${name}">

          <div class="nft">
              <h3>${name}</h3>
              <span class="${updateSalesColor(sales)}">${sales}</span>
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
  if (sales >= 5) {
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

//init site

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
async function initSite() {
  let myData = await getNFT(URLS.NEW_URL);
  filterByCreator(myData);
}
window.addEventListener("DOMContentLoaded", initSite);
