// server.js
const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let mongoose = require('mongoose');
const connectionURL = process.env.MONGO_URL;
console.log("connection url = " + connectionURL);
console.log("proc.env.M_U = " + process.env.MONGO_URL);

const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client.connect(function (err, client) {
        console.log("Getting as far as connect fxn");
        console.log("Err = " + err);
        assert.equal(null, err);
        console.log("After assert err = " + err);
	console.log("Connected to server");
        const test = client.db("scav_test_db").collection("scav_test_col");
	// Basic CRUD functions                                                                                       

        /* **********IMPORTANT**********                                                                              
           All db variables passed into functions should be constants of the form:                                    
                  client.db("some_database").collection("some_collection")                                            
           or else the test functions will not work.                                                                  
	*/

        function addEntry(db, entry){
            let ran = db.insertOne(entry);
            if(ran) console.log("Entry added: \n" + entry + "\n");
            else console.log("Entry was not added");
        };

        function delEntry(db, entry){
            let ran = db.findOneAndDelete(entry);
            if(ran) console.log("Entry deleted: \n" + entry + "\n");
            else console.log("Entry was not deleted");
        };

	function findEntry(db, entry){
            let found = db.find(entry);
            console.log("Found entry: \n" + found + "/n");
        };

	// clearDB(<db_name>) clears database

	client.close();
    });

// Serve static files from the public dir
app.use(express.static("public"));

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
  console.log('Try visiting http://localhost:3000/hello.html');
});