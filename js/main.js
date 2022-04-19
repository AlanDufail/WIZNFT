import constants from "./constants.js";
import filters from "./filters.js";
import callsApi from "./calls-api.js";



//init site

async function initSite() {
  filters.createFilter();  
  await callsApi.getNFT(constants.BASE_URL);

}
window.addEventListener("DOMContentLoaded", initSite);
