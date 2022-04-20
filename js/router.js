const navHome = document.querySelector('.nav-home');

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleRoute();
}



const routes = {
    "/" : "../pages/",
    "/shopping": "../pages/shopping.html",
    "/favorite": "../pages/favorite.html",
}

const handleRoute = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    document.querySelector(".wrapper").innerHTML =  html; 
};
const addRouteClick = navHome.addEventListener("click",console.log(window.location.pathname));
window.onpopstate = handleRoute;
window.route = route;


export default {
    addRouteClick,
    handleRoute,
}