// server.js                                                                              
const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let mongoose = require('mongoose');
const connectionURL = process.env.MONGO_URL;
console.log("connection url = " + connectionURL);
console.log("proc.env.M_U = " + process.env.MONGO_URL);
var bodyParser = require("body-parser");


// Serve static files from the public dir                                                 
app.use(express.static("public"));

//the bodyparser will translate the submit button's data to json
app.use(bodyParser.urlencoded({ extended: false }));

// Start the web server on port 3000                                                      
app.listen(3000, () => {
	console.log('Listening on http://localhost:3000');
	console.log('Try visiting http://localhost:3000/scavenger.html');
    });


//client decl,  connect wraps all routes
const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client.connect((err, client) => {
    assert.equal(null, err);
    console.log("After assert err = " + err);

//Adds lost submitted data to database
app.post("/submitLost", function(req, res) {

    let entry = {
        "main": req.body.main,
        "subs": req.body.subs,
        "desc": req.body.description,
        "contact": req.body.contact
    };

    submit_to_db(entry, "scav_demo_lost");
     
    res.set('Content-Type', 'text/html');
    res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');
    
    

});

//Adds Found submitted data to database
app.post("/submitFound", function(req, res) {
	let entry = {
	    "main": req.body.main,
        "subs": req.body.subs,
        "desc": req.body.description,
        "contact": req.body.contact
	};

	submit_to_db(entry, "scav_demo_found");

	res.set('Content-Type', 'text/html');
	res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');

});

//displays search results
//entries is cursor to entries in database collection
app.get("/submitSearch", function (req, res) {
    let entries;
    let entry = {"main": req.query.main, "subs": req.query.subs};
    
    const db = client.db("scav_test_db").collection("scav_demo_found");
    
    //console.log("before entries assigned");
    //entries = db.find({entry});
	//console.log("after entries assigned");
    
    console.log("entry = " + JSON.stringify(entry) + "\n");
    console.log("r.b.main = " + req.body.main + "\n");
    console.log("query: " + JSON.stringify(req.query));

	db.find(entry).toArray(function(err, results) {
		assert.equal(err, null);
        console.log("results are " + results)
        
        console.log("results are get\n");
        res.set('Content-Type', 'text/html');
        console.log("set didn't fail");
        res.send(results);
        
    });

});


// entry is a json object containing new entry
// database is really a collection in a database                                            
// database is a string that should have value either "scav_demo_found" or "scav_demo_los\
//t", but "scav_test_col" can also be used for testing                                      
function submit_to_db(entry, database){
    console.log("Getting as far as connect fxn");
    console.log("Err = " + err);
    assert.equal(null, err);
    console.log("After assert err = " + err);
    console.log("Connected to server");
    
    const db = client.db("scav_test_db").collection(database);

    let ran = db.insertOne(entry);
    if(ran){ 
		console.log("Entry added: \n" + entry + "\n");
		success = 1;
	} else {
		console.log("Entry was not added");
		success = 0;
	}
};


});
client.close();