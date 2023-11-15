
//여기서 index.html main 태그 안에 해당 data 값들을 보여줘야함

const MAIN = document.querySelector("main")

const design = () => {
    
    console.log("design")
    // const res = fetch('/src/data/postData.json')
    // const data = res.json()
    // const matchedData = data.filter(item => item.category === design)




//     matchedData.forEach((a, i)=>{
//         const lists = document.createElement("div");
//         lists.innerHTML = `
//         <button class="list_contents" data-id="${data[i].id}">
//             <img src="${data[i].src}" />
//                 <div id="contents">
//                     <div id="title">${data[i].title}</div>
//                     <div id="desc">${data[i].desc}</div>
//                     <div id="date">${data[i].date}</div>
//                 </div>
//         </button>
//         `
//         document.querySelector("main").append(lists)
// })
};


export default design;
