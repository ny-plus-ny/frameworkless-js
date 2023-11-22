import homePage from './home.js';
import designPage from './design.js';
import notFound from './404.js';
import pageHandler from './pageHandler.js';

const HEADER = document.getElementById("header")
const MAIN = document.querySelector("main")

const routes = [
  {path: "/", component: homePage },
  {path: "/post/:id", component: pageHandler },
  {path: "/design", component: designPage },
]

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const _path = window.location.pathname;
// const matchedRoute = routes.map(route => {
//   return _path.match(pathToRegex(route.path))
// })
// const notNullRoute =  matchedRoute.find( route => route !== null) 

const objMatchedRoute = routes.map(route => {
    return {
      route: route,
      result: _path.match(pathToRegex(route.path))
    };
})

let nopeNullRoute = objMatchedRoute.find(item => item.result !== null)

console.log("objMatchedRoute: ",objMatchedRoute, "nopeNullRoute:", nopeNullRoute)
const getURL = (url) => {
    const values = url.result.slice(1)
    const keys = Array.from(url.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
      return [key, values[i]];
    }));
}



const router = async () => {
    const componentFunc = () => {
      const view = nopeNullRoute.route.component(getURL(nopeNullRoute))
      if(view) {
        console.log("view", view[1])
        routes.find(route => route.path === nopeNullRoute.result[0])?.component(view[1]) || notFound()
      } else {
        routes.find(route => route.path === nopeNullRoute.result[0])?.component() || notFound() 
      }
    };

    const showComponent = async (id) => {
      if (id){
        // const view = nopeNullRoute.route.component(getURL(nopeNullRoute))
        MAIN.replaceChildren(await componentFunc(id));
      } else {
        MAIN.replaceChildren(await componentFunc());
      }
    }
    
    try {    
      MAIN.replaceChildren(await showComponent(nopeNullRoute.result[0]));
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
    router()
})



window.addEventListener('popstate', () => {
    router();
});

window.addEventListener('DOMContentLoaded', ()=> {
    router()
});


