// server.js
const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let mongoose = require('mongoose');
const connectionURL = process.env.MONGO_URL;
console.log("connection url = " + connectionURL);
console.log("proc.env.M_U = " + process.env.MONGO_URL);

// Serve static files from the public dir
app.use(express.static("public"));

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
  console.log('Try visiting http://localhost:3000/hello.html');
});

<<<<<<< HEAD
const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client.connect(function (err, client) {
        console.log("Getting as far as connect fxn");
=======
// entry is a json object containing new entry
// database is a string that should have value either "scav_demo_found" or "scav_demo_lost", but "scav_test_col" can also be used for testing
function submit_to_db(entry, database){
    const client = new MongoClient(connectionURL, { useNewUrlParser: true });
    client.connect(function (err, client) {
	console.log("Getting as far as connect fxn");
>>>>>>> 7797ed40062129a142cf4c6079883e533e596d9b
        console.log("Err = " + err);
        assert.equal(null, err);
        console.log("After assert err = " + err);
	console.log("Connected to server");
        const db = client.db("scav_test_db").collection(database);

            let ran = db.insertOne(entry);
            if(ran) console.log("Entry added: \n" + entry + "\n");
            else console.log("Entry was not added");
       
	client.close();
    });
<<<<<<< HEAD
=======
};
>>>>>>> 7797ed40062129a142cf4c6079883e533e596d9b
