const pageHandler = async (params) => {

    const {id} = params;
    
    await fetch("/src/data/postData.json")
        .then(response => response.json())
        .then(data => {
            const idMatchedData = data.find(item => item.id = id) 
            console.log("idMatchedData:",idMatchedData)

            const posting = document.createElement("div");
                posting.innerHTML = `
                    <div>
                        <img src="${idMatchedData.src}" alt="${idMatchedData.title}">
                        <h2>${idMatchedData.title}  ${idMatchedData.id}</h2>
                        <p>${idMatchedData.desc}</p>
                        <p>Date: ${idMatchedData.date}</p>
                    </div>
                `
                document.querySelector("main").append(posting);
        })
    }
    export default pageHandler;
