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

    /*// Create a student from the submitted form data
    var stu = new Student({
        name: req.body.name,
        gpa: req.body.gpa,
        birthDate: new Date(req.body.birthdate)
    });*/
	
    let entry = {
        "main": req.body.main,
        "subs": req.body.subs,
        "desc": req.body.desc,
        "contact": req.body.contact
    }; //eventually will need to save contact info and image to db also

    submit_to_db(entry, "scav_test_col");
     
    res.set('Content-Type', 'text/html');
    res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');
    //res.redirect(301, 'http://localhost:3000/Lost.html');
    

});

//Adds Found submitted data to database
app.post("/submitFound", function(req, res) {
	let entry = {
	    "main": req.body.main,
        "subs": req.body.subs,
        "desc": req.body.desc,
        "contact": req.body.contact
	};

	submit_to_db(entry, "scav_test_col");

	res.set('Content-Type', 'text/html');
	res.send('<p>Success. Return to Scavenger site: <a href="scavenger.html">return</a></p>');
	//res.redirect(301, 'http://localhost:3000/Found.html');
});

//displays search results
//entries is cursor to entries in database collection
app.get("/submitSearch", function (req, res) {
    let entries;
    let entry = {"main": req.body.main, "subs": req.body.subs};
    
    const db = client.db("scav_test_db").collection("scav_test_col");
    
    //console.log("before entries assigned");
    //entries = db.find({entry});
	//console.log("after entries assigned");
    
    console.log("entry = " + entry + "\n");
    console.log("r.b.main = " + req.body.main + "\n");

	db.find(entry).toArray(function(err, results) {
		assert.equal(err, null);
        console.log(results)
        
        console.log("results are get\n");
        res.set('Content-Type', 'text/html');
        console.log("set didn't fail");
        res.send(results);
        
        //localStorage.setItem("res", results);
        //res.json(results);
        //callback(results);
    });

    //console.log("outside parens now\n");


	//let result = entries.toArray();
	//console.log("result is " + result);

	//for(let i = 0; i < result.length; i++){
	//    console.log("Entry number " + i + " is: " + result[i] + "\n");
	//}

    // res goes here
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