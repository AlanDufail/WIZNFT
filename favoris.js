const fav = document.querySelector(".fav");
// let object = {
//     id      : 385541178,
//     desc    : `dventurers are the second NFT collection from Legend Maps, representing a rogue's gallery of playable characters ready to delve into the dungeons represented by the Founder Maps, vanquish the dwellers and other dangers within, and emerge victorious with the loot... or die trying! Each Adventurer will have unique combinations of traits & abilities that will impact gameplay, and which are captured in the metadata. Learn more at [legendmaps.io](http://legendmaps.io/)`, 
//     img_url : `https://lh3.googleusercontent.com/PX0e1jJgLWMJfqvhYAdTKW_4mydaXZ09LcpmGauD_yW5qOsOUdtHyYhVZqFOtL5ssmAuLaxOo2bOs6DZ_C4mSY_1z9Nw1S54jJp1`,
//     name    : `Legend Maps Adventurer #2963`,
//     sales   : 0
// };

// localStorage.setItem('1', JSON.stringify(object));
// storage.clear();



// function setLocalStorage(data){
//     console.log(exportFavori);
//     localStorage.setItem(nft, JSON.stringify(object));
// }



// let addFav = document.getElementById('addFav');
// addFav.onclick = function() {
//   localStorage.setItem(id, JSON.stringify(exportFavoris));
//   };

function getLocalStorage(){
  Object.keys(localStorage).forEach(function(key, value){
      let mydata = JSON.parse(localStorage.getItem(key));
      const nftElm = document.createElement("div");
      nftElm.classList.add("nft");
      nftElm.innerHTML = `<div style="display : flex; flex-direction :column; align-items : center; width : fit-content; box-sizing : border-box; padding : 16px;" >`+ mydata.id+ `<img src="` + mydata.img_url +`"></img>` + `<a id="removeFav">Supprimer des favoris</a></div>`;
      fav.appendChild(nftElm);

  });
}
// setLocalStorage();
getLocalStorage();




// deleteLocalStorage();






