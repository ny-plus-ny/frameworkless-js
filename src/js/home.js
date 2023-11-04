

console.log("home!!!")


fetch('/src/data/postData.json')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((a, i)=>{
        console.log(i.name)
        const lists = document.createElement("div");
        lists.innerHTML = `
            <img src="${data[i].src}" />
            <div class="list_contents">
                <div id="title">${data[i].title}</div>
                <div id="desc">${data[i].desc}</div>
                <div id="date">${data[i].date}</div>
            </div>
        `
    document.getElementById("home_wrapper").append(lists)
})

})
.catch(error => console.error('데이터 가져오기 오류: ', error));