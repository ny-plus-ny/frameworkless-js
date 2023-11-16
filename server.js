const express = require("express")
const path = require("path")

const app = express();
const port = 3000;


//app.use('요청 경로', express.static('실제 경로'));
app.use('/src', express.static(path.join(__dirname,'src')))

app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,'src', 'index.html'))
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src/index.html'));
//   });

app.listen(port , ()=> {console.log(`server running on ${port}=33`)})