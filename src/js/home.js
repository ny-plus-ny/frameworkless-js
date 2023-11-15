const home = async () => {

    console.log("home!!!")

fetch('/src/data/postData.json')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((a, i)=>{
        const lists = document.createElement("div");
        lists.innerHTML = `
        <button class="list_contents" data-id="${data[i].id}">
            <img src="${data[i].src}" />
                <div id="contents">
                    <div id="title">${data[i].title}</div>
                    <div id="desc">${data[i].desc}</div>
                    <div id="date">${data[i].date}</div>
                </div>
        </button>
        `
        document.querySelector("main").append(lists)
})

})
.catch(error => console.error('데이터 가져오기 오류: ', error));
}
// fetch('/src/data/postData.json')
// .then(response => response.json())
// .then(data => {
//     console.log(data)
//     data.forEach((a, i)=>{
//         console.log(i.name)
//         const lists = document.createElement("div");
//         lists.innerHTML = `
//             <img src="${data[i].src}" />
//             <div class="list_contents">
//                 <div id="title">${data[i].title}</div>
//                 <div id="desc">${data[i].desc}</div>
//                 <div id="date">${data[i].date}</div>
//             </div>
//         `
//     document.getElementById("home_wrapper").append(lists)
// })

// })
// .catch(error => console.error('데이터 가져오기 오류: ', error));




export default home;