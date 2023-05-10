const express = require("express");
const bodyParse = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/8683af6a87";
    const options = {
        method: "POST",
        auth: "saar1:5f0d846f53ef61bda0730602d062fdfa-us18"
    };

    const request = https.request(url, options,function (respone){
        if(respone.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        respone.on("data", function (data){
            console.log(JSON.parse(data));
        })})

    request.write(jsonData);
    request.end();

})

app.post("/failure",function (req, res){
    res.redirect("/");
})

app.post("/success",function (req, res){
    res.redirect("/");
})

app.listen(3000,function (){
    console.log("Listeningggggggg");
})


//api key 5f0d846f53ef61bda0730602d062fdfa-us18

//8683af6a87