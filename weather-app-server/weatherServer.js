const express = require("express");
const request = require("request");
const cors = require("cors");
require("dotenv").config();

const app = express();
// ADD CORS
app.use(cors());

//////////////////////////
////////GET REQUESTS//////
//////////////////////////

//Get current weather for specific city name
app.get("/", (req, res) => {
  let city = req.query.city;
  request(
    `https://api.weatherapi.com/v1/current.json?q=${city}&key=${process.env.SECRECT_KEY_WEATHER_API}`,
    function (error, response, body) {
      let data = JSON.parse(body);
      if (response.statusCode === 200) {
        res.send(data);
      } else {
        res.status(400).send("Oh uh, something went wrong");
      }
    }
  );
});

app.listen(5000, () => console.log("Server is listening to port 5000"));
