const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/bmicalculator",function (req, res){
    res.sendFile(__dirname+"/bmiCalculator.html")
})

app.post("/bmicalculator",function (req, res){
    res.send("Your BMI is: "+ Number(req.body.weight)/(Number(req.body.height)*Number(req.body.height)) )
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function (req, res){
    var a = Number(req.body.num1);
    var b = Number(req.body.num2);
    var ans = a+b;
    res.send(""+ans);
});

app.listen(3000,function (){
    console.log("Listening....")
});





