
async function fetchHtmlAsText(url) {
    return (await fetch(url)).text();
}

async function importPage(target) {
    document.querySelector("main").innerHTML = await fetchHtmlAsText(target + '.html');
    console.log(target)
}

function navigate(state) {
    importPage(state.path)
}
  

["home", "design","development", "recruit"].forEach((path) => {
    const button = document.querySelector("#" + path);
    button.addEventListener("click", () => {
      const state = { path };
    //   console.log("path: ", path, "state", state.path);
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
    data.forEach((a, i)=>{
        console.log(i.name)
        console.log(window.location.hash)
        const lists = document.createElement("div");
        lists.innerHTML = `
        <div class="list_contents">
            <img src="${data[i].src}" />
                <div id="contents">
                    <div id="title">${data[i].title}</div>
                    <div id="desc">${data[i].desc}</div>
                    <div id="date">${data[i].date}</div>
                </div>
            </div>
        `
    document.querySelector("main").append(lists)
})

})
.catch(error => console.error('데이터 가져오기 오류: ', error));



