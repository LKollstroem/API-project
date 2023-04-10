//Express, FS and Mongo modules
var express = require('express');
var fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

//require library into code
var app = express();
//require form data module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
//require env
require("dotenv").config();

//user id and password
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

//Const url command
const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/?retryWrites=true&w=majority";

//create routes for get all
app.get('/api/movies', function (req, res){
    //connection object
    const client = new MongoClient(uri, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    async function connectAndFetch(){
        try{
        //Mongo connection details here
        await client.connect();
        const collection = client.db("sample_mflix").collection("movies");
        //Make query
        var result = await collection
            .find() //empty () for all items
            .limit(10) // we do not want to get all so limit to 10
            .toArray()
        res.send(result);

        } catch(e){
            console.log(e);
        }finally {
            await client.close();
            console.log("Connection closed to Mongo")
        }

    }
    connectAndFetch();
});
  

//set web server to listen to port
app.listen(8081, function(){
    console.log('Example app listening on port 8081');
});