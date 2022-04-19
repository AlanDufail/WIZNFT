import constants from "./constants.js";
import nftCard from "./nftCard.js";

//lazy loader
function lazyLoading() {
  for (let i = 0; i <= 20; i++) {
    const nftElm = document.createElement("article");
    nftElm.classList.add("nft");
    nftElm.innerHTML = `
             <img class="nft_img loading"src="../Assets/Image/" alt="">
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
    constants.content.appendChild(nftElm);
  }
}

export default {
    lazyLoading,
}