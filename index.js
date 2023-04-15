//Express module and FS
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
var userSpotify = process.env.USERID;
var pwAtlas = process.env.PASSWORD
var token;

//create routes for SPOTIFY sign in page
app.get("/", (req, res) => {
    res.send(
      "<a href='https://accounts.spotify.com/authorize?client_id=" +
      userSpotify +
        "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fhome&scope=user-top-read'>Sign in</a>"
    );
});
//Create routes for redirect page after authorization to get Spotify API
app.get("/home", async (req, res) => {
    console.log("spotify response code is " + req.query.code);
    res.send("HOME PAGE");
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

//
//Trying to connect to Mongo in Atlas
const uri = "mongodb+srv://leenakollstrom:" + pwAtlas + "@cluster0.0sdore5.mongodb.net/test";

//Make routes with mongo and first add some data
MongoClient.connect(uri, function(err, db) {
  if (err) retur
  var playlist = db.playlist('album')
  playlist.insert({artist: 'Roxette', song: 'Love', album: 'Lovers', year:'2019' }, function(err, result) {
    playlist.find({artist: 'Roxette'}).toArray(function(err, docs) {
      console.log(docs[0])
      db.close()
    })
  })
})

//Then routes to get the data
app.get('/getall', function (req, res){
  console.log("Asking for all playlist albums from database");
 //connection object
  const client = new MongoClient(uri, {
      useNewUrlParser:true,
      useUnifiedTopology:true
  })
  console.log("start connection");
  async function printPlaylist(){
      try{
//Mongo connection query details
      await client.connect();
      const collection = client.db("playlist").collection("album");
//Make query
      var result = await collection
          .find() //all items
          .limit(10) // we want only 10
          .toArray()
      res.send(result);

      } catch(e){
          console.log(e);
      }finally {
          await client.close();
          console.log("Mongodb connecton has been closed")
      }

  }
//Not sure how to make this print with JSON as asked for.
  printPlaylist();
});
//Return one item with given id mongodb:
app.get("/:id", function(req, res){
  const client = new MongoClient(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  res.send("Get song with id: " + req.params.id);
//pare data to make it look good
  var results = '<H1>GET ALBUM</H1><style>table, td {background-color: powderblue; border: 1px solid black;}</style><table border="1">';
  for(var i =0; i<data.length; i++){
        results +=
        '<tr>'+
        '<td>' +data[i].id+'</td>'+
        '<td>' +data[i].artist+'</td>'+
        '<td>' +data[i].song+'</td>'+
        '<td>' +data[i].album+'</td>'+
        '<td>' +data[i].year+'</td>'+
        '</tr>';
    }
  res.send(results);
});  
//create routes for add function
app.post("/add", function(req, res){
  const client = new MongoClient(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  var id = data.length + 1;
  var id;
  var artist = req.body.artist;
  var song = req.body.song;
  var album = req.body.album;
  var year = req.body.year;
  res.send("ADD SONG");
  
//remind if empty
  if(artist === "" || song === "" || album === "" || year === ""){
    res.send('Please fill in all fields!');
  }else{
    res.send("Add Song: " + song + artist + album + "(" + year + ")");
  }  
});  

//delete function not working yet
app.delete("/remove/:id", function(req, res){
  res.send("Remove album by " + req.params.id);
});  
//put function -- not working
//delete function
app.put("/update/:id", function(req, res){
  res.send("Modify album by id " + req.params.id);
});  

//set web server to listen to port
var PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
    console.log('App listening on port %d', PORT);
});
app.get("/", (req, res) => {
  res.send("Home");
});