var express = require("express");

var port = (process.env.PORT||1607);


var app = express();


app.use("/",express.static(__dirname +"/public"));

app.get("/hello", (req,res) =>{
    res.send("Hello World")
});

///////APIS

var apiSpanUnivStats = require("./api/span-univ-stats.js")

app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server not ready "+ e);
});
