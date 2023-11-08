const express = require("express")
const path = require("path")

const app = express();

//app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(path.join(__dirname,'src')))

app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,'src'))
})

app.listen(process.env.PORT || 3000 , ()=> {console.log("server running=33")})