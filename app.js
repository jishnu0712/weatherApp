
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    let cityName = req.body.cityName;
    const apiKey = "323eecb3b884f86eae937878ae160d27";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + cityName + "&unit=" + unit + "";

    https.get(url, function (response) {

        response.on("data", (data) => {
            let t = JSON.parse(data);
            console.log(t.weather[0].description);
            const icon = t.weather[0].icon;

            res.write("<h1>weather in " + cityName + " is " + t.weather[0].description + "<h1>");
            res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
            res.send();
        });

        console.log(response.statusCode);
    })


    console.log("post req received");
});




app.listen(3000, function () {
    console.log("server is running.");
});