import homePage from './home.js';
import postPage from './post.js';
import designPage from './design.js';
import notFound from './404.js';

const HEADER = document.getElementById("header")
const MAIN = document.querySelector("main")
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const routes = [
    {path: "/", component: homePage },
    {path: "/post", component: postPage },
    {path: "/design", component: designPage },
    {path: "/desgin:id", component: designPage },
]

console.log("index3.js ok")

//**** 기 render
const router = async path => {
    // $navigation의 a 요소를 클릭하면 path(a 요소의 href)가 전달된다.
    // 하지만 웹페이지가 처음 로딩되거나 앞으로/뒤로 가기 버튼을 클릭하면 path를 전달하지 않는다.
    // 이때 window.location.pathname를 키로 routes에서 컴포넌트를 결정해 뷰를 전환한다.
    const _path = path ?? window.location.pathname.match(pathToRegex(path));
   console.log("_path is: ",_path)
    try {
      const component = routes.find(route => route.path === _path)?.component || notFound;
      MAIN.replaceChildren(await component());
    } catch (err) {
      console.error(err);
    }
  };


HEADER.addEventListener("click", (e)=>{
    // a 태그를 클릭했는지 확인
    if (!e.target.matches(" header > a ")){
        return
    }
    e.preventDefault();
    //**** 이동할 페이지의 path
    const pathHref = e.target.getAttribute('href');
    console.log("href???", pathHref)

    //**** 현재 페이지와 이동할 페이지가 같으면 이동하지 않는다.
    if (window.location.pathname === pathHref) return;

    //**** pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지 않음
    window.history.pushState(null, null, pathHref);

    router(pathHref)
})

window.addEventListener('popstate', () => {
    // console.log('[popstate]', window.location.pathname);
    router();
  });

window.addEventListener('DOMContentLoaded', () => router('/'));
