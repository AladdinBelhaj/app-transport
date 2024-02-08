const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");


var corsOptions ={
    origin:"*"
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello Express');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})




