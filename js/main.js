//const def
const URLS = {
  BASE_URL: "https://awesome-nft-app.herokuapp.com/?page=1",
};

const filterSelect = [
  {
    id: "0",
    label: "Filter by",
  },
  {
    id: "1",
    label: "search",
  },
  {
    id: "2",
    label: "creator",
  },
  {
    id: "3",
    label: "sales",
  },
];

const content = document.querySelector(".content");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");
const filters = document.querySelector(".filters");
const btn_filter = document.querySelector(".btn_filter");
const search = document.querySelector(".search");
const nftLoading = document.querySelector(".nft-loading");

//variable def
let currentPage = 1;
let nextPage = 1;
let prevPage = 0;
let totalPages = 20;
let creator = false;
let sales = false;

function createFilter() {
  filters.innerHTML = "";

  filterSelect.forEach((filter) => {
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
    filters.appendChild(btn);
    // btn.addEventListener('click', )
  });
}

async function getNFT(url) {
  lazyLoading();  
  return new Promise(async (success, failed) => { 
    await fetch(url) //1
      .then((response) => response.json()) //2
      .then((data) => {
        success(data.assets);
        deleteNft();
        if (data.assets.length !== 0) {
          displayNFT(data.assets);
          if (currentPage <= 1) {
            prev.classList.add("disabled");
            next.classList.remove("disabled");
          } else if (currentPage >= totalPages) {
            prev.classList.remove("disabled");
            next.classList.add("disabled");
          } else {
            prev.classList.remove("disabled");
            next.classList.remove("disabled");
          }
          filters.scrollIntoView({ behavior: "smooth" });
        } else {
          content.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }
      });
  });
}

function displayNFT(data) {
  data.forEach((nft) => {
    const { name, description, image_url, sales, creator, id } = nft;
    const nftElm = document.createElement("article");
    nftElm.classList.add("nft");
    nftElm.innerHTML = `
           <img class="nft_img loading"src="${
             image_url ? image_url : "./Assets/Image/image_not_found.png"
           }" alt="${name}">
            <div class="nft-info">
              <h3 class="nft-title">${name ? name : "Item no longer available"}</h3>
              <div>
                <p class="nft-creator">Creator: ${creator.username ? creator.username : "unknown"}</p>
                <span class="${updateSalesColor(sales)}">Sale's  number : ${sales}</span>
              </div>

              <div class="desc">
                <h4>Description</h4>
                <p>${description ? description : "No description available"}</p>
                <br/>
                <button class="show-more" id="${id}">Show More</button
              </div>
          </div>
           `;
    content.appendChild(nftElm);
    
    document.getElementById(id).addEventListener('click', () => {
      console.log(id)
      openOverlay(nft)
    })
  });
}

function updateSalesColor(sales) {
  if (sales >= 20) {
    return "red";
  } else {
    return "green";
  }
}

function checkDescription(desc){
  if(desc.length > 100){
    console.log('ici desc');
  }else{
    console.log('non');
  }
}

function addSearchInput() {
  const searchInput = document.createElement("input");
  searchInput.id = "searchbar";
  searchInput.name = "search";
  searchInput.placeholder = "Rechercher par créateur...";
  search.appendChild(searchInput);

  searchInput.addEventListener("keyup", filterByName);
}


async function filterByName() { //search
  let valeurSearch = [];
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let myData = await getNFT(
    `https://awesome-nft-app.herokuapp.com/search?q=${input}`
  );
  for (i = 0; i < myData.length; i++) {
    if (!myData[i].creator.username.toLowerCase().includes(input)) {
      //display none
    } else {
      valeurSearch.push(myData[i]);
    }
  }
  deleteNft();
  await displayNFT(valeurSearch);
}

async function filterByCreator() {
//TODO YANIS
}

async function filterBySales() {
  deleteNft();
  await getNFT(
    `https://awesome-nft-app.herokuapp.com/?page=${currentPage}&sales=true`
  );
}

async function selectPage(page) {
  deleteNft();
  await getNFT(`https://awesome-nft-app.herokuapp.com/?page=${page}`);
}

function deleteNft() {
  const allNfts = document.querySelectorAll(".nft");
  allNfts.forEach((nft) => {
    nft.remove();
  });
}
const overlayContent = document.querySelector('.overlay-content');

function openOverlay(nft){
  let id = nft.id;
  console.log('ici');
  fetch(`https://awesome-nft-app.herokuapp.com/nft/${id}`)
  .then((response) => response.json())
  .then(nftInfo => {
    console.log(nftInfo);
    if(nftInfo){
      document.querySelector(".overlay").style.width = "100%";
      const content = `
      <h1 class="content-h1">${nft.name}</h1>
      <div class="content-image">
        <img src=${nft.image_url}>
      </div>
      <div class="content-info">
        <p>Creator: ${nft.creator.username? nft.creator.username : "unknown"}</p>
        <p>Sale's number: ${nft.sales}</p>
      </div>
      <div class="content-collection">
        <h2>${nft.collection.name}</h2>
        <img src=${nft.collection.banner_image_url}>
        <p>${nft.collection.description}</p>
      </div>
      `
      overlayContent.innerHTML = content;
      console.log(overlayContent);
    }
  })
}
function closeNav() {
  document.querySelector(".overlay").style.width = "0%";
}


//lazy loader


function lazyLoading() {  
  for (let i=0; i <= 20; i++){
    const nftElm = document.createElement("article");
    nftElm.classList.add("nft");
    nftElm.innerHTML = `
           <img class="nft_img loading"src="" alt="">
            <div class="nft-info">
              <h3 class="nft-title loading"></h3>
              <div>
                <p class="nft-creator loading"></p>
                <span class="loading"></span>
              </div>

              <div class="desc">
                <h4>Description</h4>
                <p></p>
                <br/>
                <button class="show-more" id="">Show More</button
              </div>
          </div>
           `;
    content.appendChild(nftElm);
  }
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
//init site

async function initSite() {
  let myData = await getNFT(URLS.BASE_URL);
  createFilter();
  filterByName(myData);


}
window.addEventListener("DOMContentLoaded", initSite);
