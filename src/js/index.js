import homePage from './home.js';
import postPage from './post.js';
import notFound from './404.js';

const HEADER = document.getElementById("header")
const MAIN = document.querySelector("main")
// const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const routes = [
    {path: "/", component: homePage },
    {path: "/post:id", component: postPage },
    // {path: "/design", component: designPage },
    // {path: "/desgin:id", component: designPage },
]

console.log("index3.js ok")

const router = async path => {
    const _path = path ?? window.location.pathname;
    console.log("_path is: ",_path)
    try {
      const component = routes.find(route => route.path === _path)?.component || notFound;
      MAIN.replaceChildren(await component());
    } catch (err) {
      console.error(err);
    }
  };

HEADER.addEventListener("click", (e)=>{
    if (!e.target.matches(" header > a ")){
        return
    }
    e.preventDefault();
    const pathHref = e.target.getAttribute('href');

    if (window.location.pathname === pathHref) return;

    window.history.pushState(null, null, pathHref);

    router(pathHref)
})


window.addEventListener('popstate', () => {
    router();
  });

window.addEventListener('DOMContentLoaded', ()=> {router()});


