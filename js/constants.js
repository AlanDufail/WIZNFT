//constants section used by few other JS files
const BASE_URL = "https://awesome-nft-app.herokuapp.com/?page=1";
const filterSelect = [
    {
      id: "0",
      label: "Filter by",
    },
    {
      id: "1",
      label: "Name",
    },
    {
      id: "2",
      label: "Creator",
    },
    {
      id: "3",
      label: "Top sales",
    },
  ];
const filters = document.querySelector(".filters");
const search = document.querySelector(".search");
const content = document.querySelector(".content");

// TO MODIFY
let currentPage = 1;
let nextPage = 1;
let prevPage = 0;
let totalPages = 20;

const errorMessage = [
  {
    id: "0",
    label: "unknown"
  },
  {
    id: "1",
    label: "No description available"
  },
  {
    id: "2",
    label: "No results found"
  },
  {
    id: "3",
    label: "Item no longer available"
  },
  {
    id: "4",
    label: "Add to favorite"
  }
]


export default {
    filters,
    filterSelect,
    search,
    content,
    errorMessage,
    BASE_URL,
    currentPage,
    nextPage,
    prevPage,
}