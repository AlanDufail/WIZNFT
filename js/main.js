import constants from "./constants.js";
import filters from "./filters.js";
import callsApi from "./calls-api.js";



//init site

async function initSite() {
  filters.createFilter();  
  let myData = await callsApi.getNFT(constants.BASE_URL);
  filters.filterByName(myData);
}
window.addEventListener("DOMContentLoaded", initSite);
