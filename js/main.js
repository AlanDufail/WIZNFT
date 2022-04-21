import constants from "./constants.js";
import filters from "./filters.js";
import callsApi from "./calls-api.js";
import overlay from "./overlay.js";
import favorite from "./favorite.js";

//init site
async function initSite() {

  filters.createFilter();  
  let myData = await callsApi.getNFTs(constants.BASE_URL);
  filters.filterByName(myData);
  overlay.createOverlay();
  favorite.addFavorite();
}
window.addEventListener("DOMContentLoaded", initSite);
