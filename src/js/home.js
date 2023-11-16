const home = async () => {

    console.log("home!!!")

    fetch('/src/data/postData.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((a, i)=>{
                const lists = document.createElement("div");
                lists.innerHTML = `
                <a href="/post/${data[i].id}" class="list_contents" data-id="${data[i].id}">
                    <img src="${data[i].src}" />
                        <div id="contents">
                            <div id="title">${data[i].title}</div>
                            <div id="desc">${data[i].desc}</div>
                            <div id="date">${data[i].date}</div>
                        </div>
                </a>
                `
                document.querySelector("main").append(lists)
            })

        })
        .catch(error => console.error('데이터 가져오기 오류: ', error));
}

export default home;