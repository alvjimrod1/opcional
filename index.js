var express = require("express");
var app = express();
var port = (process.env.PORT||1607);


app.get("/hello", (req,res) =>{
    res.send("Hello World")
});

app.use("/",express.static("/home/ubuntu/workspace/SOS1718-09/public"));

app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server not ready "+ e);
});
