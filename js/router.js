const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleRoute();
}



const routes = {
    "/" : "projet/pages/index.html",
    "/shopping": "projet/pages/shopping.html"
}

const handleRoute = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    document.querySelector(".wrapper").innerHTML =  html; 
};

window.onpopstate = handleRoute;
window.route = route;

handleRoute();