const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
res.send("ok");
});
app.get("/test",(req, res)=>{
    res.send({status:200, message:"ok"})
    });
    app.get("/:time",(req, res) => {
    res.send({status:200,message:time})
    });
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    });
    