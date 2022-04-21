import constants from "./constants.js";
import filters from "./filters.js";
import callsApi from "./calls-api.js";
import overlay from "./overlay.js";
import router from "./router.js";


//init site
async function initSite() {

  filters.createFilter();  
  let myData = await callsApi.getNFT(constants.BASE_URL);
  filters.filterByName(myData);
  overlay.createOverlay();

}
window.addEventListener("DOMContentLoaded", initSite);
