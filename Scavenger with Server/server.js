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


app.post("/submitLost", function(req, res) {

    /*// Create a student from the submitted form data
    var stu = new Student({
        name: req.body.name,
        gpa: req.body.gpa,
        birthDate: new Date(req.body.birthdate)
    });*/
	console.log("something\n");
	console.log(req);
	console.log("\n some other text");
    let entry = {
        "main": req.body.main,
        "subs": req.body.subs
    }; //eventually will need to save contact info and image to db also

    submit_to_db(entry, "scav_test_col");


});










// entry is a json object containing new entry                                            
// database is a string that should have value either "scav_demo_found" or "scav_demo_los\
//t", but "scav_test_col" can also be used for testing                                      
function submit_to_db(entry, database){
    const client = new MongoClient(connectionURL, { useNewUrlParser: true });
    client.connect(function (err, client) {
        console.log("Getting as far as connect fxn");
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
};

