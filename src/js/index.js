import homePage from './home.js';
import postPage from './post.js';
import designPage from './design.js';
import notFound from './404.js';

const HEADER = document.getElementById("header")
const MAIN = document.querySelector("main")

const routes = [
  {path: "/", component: homePage },
  {path: "/post/:id", component: postPage },
  {path: "/design", component: designPage },
]

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const router = async () => {
    const _path = window.location.pathname;
    const matchedRoute = routes.map(route => {
      return _path.match(pathToRegex(route.path))
    })
    const notNullRoute =  matchedRoute.find( route => route !== null) 
    const componentFunc = (dataId) => {
      if(dataId) {
        routes.find(route => route.path === notNullRoute[0])?.component(dataId) || notFound()
      } else {
        routes.find(route => route.path === notNullRoute[0])?.component() || notFound() 
      }
    };
    // const render = routes.find(route => route.path === location.pathname)?.component || notFound
    const showComponent = async (id) => {
      if (id){
        console.log("id 있음 ",id)
        MAIN.replaceChildren(await componentFunc(id));
      } else {
        console.log("id 없음")
        MAIN.replaceChildren(await componentFunc());
      }
    }

  try {
      console.log("notNullRoute:", notNullRoute)
      // const component = routes.find(route => route.path === notNullRoute[0])?.component || notFound;      
      // MAIN.replaceChildren(await showComponent(notNullRoute[1]));
      if (typeof(notNullRoute[1]) === 'string') {
        showComponent(notNullRoute[1])
      } else {
        showComponent()
      }
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

window.addEventListener('DOMContentLoaded', ()=> {router()
});


