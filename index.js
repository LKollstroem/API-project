//Express module
const express = require("express");
const app = express();

//BodyParser for form data module
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));

//require mongodb in use
const MongoClient = require("mongodb").MongoClient;

//use querystring and axios to be able to get token from Spotify
const queryString = require("node:querystring");
const axios = require("axios");

//require env for use with password and username
require("dotenv").config();

//user id, password and token
var user = process.env.USERID;
var pw = process.env.PASSWORD
var token;

//create routes for SPOTIFY authorization page

app.get("/", (req, res) => {
    res.send(
      "<a href='https://accounts.spotify.com/authorize?client_id=" +
      user +
        "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fhome&scope=user-top-read'>Sign in</a>"
    );
});
//Create routes for redirect page after authorization
app.get("/home", async (req, res) => {
    console.log("spotify response code is " + req.query.code);
    res.send("account page");
});
//route for post request to get token
app.get("/home", async (req, res) => {
  const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI_DECODED,
      }),
      {
        headers: {
          Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
  console.log(spotifyResponse.data);
  token=spotifyResponse.data;
})
app.get("/getall", async (req, res) => {
  const data = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50",
    {
      headers: {
        Authorization: "Bearer " + {token},
      },
    }
  );
})
//set web server to listen to port
var PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
    console.log('App listening on port %d', PORT);
});
app.get("/", (req, res) => {
    res.send("Hello");
});