//const def
const URLS = {

  NEW_URL: "https://awesome-nft-app.herokuapp.com/",
};

const content = document.querySelector("#content");
const search = document.querySelector("#search");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");
const form = document.querySelector("#form");

//variable def
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;
let queryUrl = "";

// async function getNFT(url) {
//   await fetch(url)
//     .then((res) => {
//       if (res.ok) {
//         console.log(res.json());
//       }else{
//         console.log('ici');
//       }
//     })
//     .then((data) => {
//       console.log(data.assets);
//       if (data.assets.length !== 0) {
//         displayNFT(data.assets);
//         currentPage = data.page;
//         nextPage = currentPage + 1;
//         prevPage = currentPage - 1;
//         totalPages = data.total_pages;

//         current.innerText = currentPage;

//         if (currentPage <= 1) {
//           prev.classList.add("disabled");
//           next.classList.remove("disabled");
//         } else if (currentPage >= totalPages) {
//           prev.classList.remove("disabled");
//           next.classList.add("disabled");
//         } else {
//           prev.classList.remove("disabled");
//           next.classList.remove("disabled");
//         }

//         tagsEl.scrollIntoView({ behavior: "smooth" });
//       } else {
//         content.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
//       }
//     });
// }

async function getNFT(url){
  await fetch(url) //1
  .then((response) => response.json()) //2
  .then((data) => {
    console.log(data.assets); //3
    return data;
    if(data.assets !== 0){
      console.log('ici');
      displayNFT(data.assets);
    }
  });
}

function displayNFT(data) {
  //content.innerHTML = "";

  data.forEach((nft) => {
    const { name, description, image_url, sales, id } = nft;
    const nftElm = document.createElement("div");
    console.log(nftElm);
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

function initSite() {
  getNFT(URLS.NEW_URL);
}
window.addEventListener("DOMContentLoaded", initSite);
