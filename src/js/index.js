
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function importPage(target) {
    document.querySelector("main").innerHTML = await fetchHtmlAsText(target + '.html');
}

function navigate(state) {
    importPage(state.path)
}
  

["home", "design","development", "recruit"].forEach((path) => {
    const button = document.querySelector("#" + path);
    button.addEventListener("click", () => {
      const state = { path };
      console.log("path: ", path, "state", state.path);

      history.pushState(state, "", path);
      navigate(state);
    });
  }
);
  
window.addEventListener('popstate', (event) => {
    navigate(event.state)
})

fetch('/src/data/postData.json')
.then(response => response.json())
.then(data => {
    data.map((item, index)=>{
        const titleElements = document.querySelectorAll('.title')
        if (index < titleElements.length) {
            titleElements[index].innerHTML = item.title;
        }
    })

})
.catch(error => console.error('데이터 가져오기 오류: ', error));