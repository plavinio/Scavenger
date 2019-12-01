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

//Adds lost submitted data to database
app.post("/submitLost", function(req, res) {

    /*// Create a student from the submitted form data
    var stu = new Student({
        name: req.body.name,
        gpa: req.body.gpa,
        birthDate: new Date(req.body.birthdate)
    });*/
	
    let entry = {
        "main": req.body.main,
        "subs": req.body.subs
    }; //eventually will need to save contact info and image to db also

    submit_to_db(entry, "scav_test_col");
     
    res.set('Content-Type', 'text/html');
    res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');
    res.redirect(301, 'http://localhost:3000/Lost.html');
    

});

//Adds Found submitted data to database
app.post("/submitFound", function(req, res) {
	let entry = {
	    "main": req.body.main,
	    "subs": req.body.subs
	};

	submit_to_db(entry, "scav_test_col");

	res.set('Content-Type', 'text/html');
	res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');
	res.redirect(301, 'http://localhost:3000/Found.html');
});


//displays search results
app.post("/submitSearch", function(req, res) {
    //let entry;
    
    let entries = db.scav_test_col.find().toArray();
    console.log("first entry returned is: " + entries[0]);
    
}







});










// entry is a json object containing new entry                                            
// database is a string that should have value either "scav_demo_found" or "scav_demo_los\
//t", but "scav_test_col" can also be used for testing                                      
function submit_to_db(entry, database){
    const client = new MongoClient(connectionURL, { useNewUrlParser: true });
    //let success = 0;
    client.connect(err => {
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
	    }
            else {
		console.log("Entry was not added");
		success = 0;
	    }
	    console.log("before close \n");
        client.close();
	console.log("after close \n");
	});
    console.log("get to just before success");
    //return success;
};

