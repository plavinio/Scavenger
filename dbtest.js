//let mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let mongoose = require('mongoose');
//let express = require('express');
const connectionURL = process.env.MONGO_URL;
console.log("connection url = " + connectionURL);
console.log("proc.env.M_U = " + process.env.MONGO_URL);
const dbName = 'test_db';
const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client.connect(function (err, client) {
    assert.equal(null, err);
    console.log("Connected to server");
	const test = client.db("scav_test_db").collection("scav_test_col");
	
	// Just saving this in case I want it later --H
	function initTest() {
	    test.insertOne({cat_main: "urgent", cat_sub: "keys"});
	    let found = test.find({cat_main: "urgent", cat_sub: "keys"});
	    console.log("Inserted item: \n" + found + "\n cat_main should be urgent \n cat_sub should be keys");
	    //let found = collection.find({callLetters: "VCSZ"});
	    //console.log(found + "\n Hey, look! It actually works!");
	};

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

	// This fails interestingly. If we ever really want to implement a replace function, we'll have to look into it further
	/*	function repEntry(db, old_entry, new_entry){
	    let ran = db.findOneAndReplace(old_entry, new_entry);
	    if(ran) console.log("Entry (1) was replaced with entry (2): \n (1): \n" + old_entry + "\n (2): \n" + new_entry + "\n");
	    else console.log("Entry replacement not successful");
	};
	*/

	function findEntry(db, entry){
	    let found = db.find(entry);
	    console.log("Found entry: \n" + found + "/n");
	};

	// Test functions
	function test_add(db, entry){
	    addEntry(db, entry);
	    console.log("\n \n \n");
	};

	function test_del(db, entry){
	    delEntry(db, entry);
            console.log("\n \n \n");
	};

	// Test corresponds to repEntry, which fails intriguingly
	/*
	function test_rep(db, old_entry, new_entry){
	    repEntry(db, old_entry, new_entry);
            console.log("\n \n \n");
	};
	*/

	function test_find(db, entry){
	    findEntry(db, entry);
	    console.log("\n \n \n");
	};

	function clearDB (db){
	    db.deleteMany();
	};

	// Test entries
	let e0 = {cat_main: "", cat_sub: ""};
	let e1 = {cat_main: "urgent", cat_sub: ""};
	let e2 = {cat_main: "", cat_sub: "keys"};
	let e3 = {cat_main: "urgent", cat_sub: "keys"};
	let e4 = {cat_main: "urgent", cat_sub: "keys"};
	let e5 = {cat_main: "urgent", cat_sub: "money"};
	let e6 = {cat_main: "tech", cat_sub: "phone"};
	/*let e7 = {cat_main: "", cat_sub: ""};
	let e8 = {cat_main: "", cat_sub: ""};
	let e9 = {cat_main: "", cat_sub: ""};*/

	
	//Tests
	//	clearDB(test);

	/*
	addEntry(test, e0);
	addEntry(test, e1);
	addEntry(test, e2);
	addEntry(test, e3);
	addEntry(test, e4);
	addEntry(test, e5);
	addEntry(test, e6);

	delEntry(test, e0);
	delEntry(test, e1);
	delEntry(test, e2);
	*/

       	//addEntry(test, e0);
       	//addEntry(test, e1);
       	//addEntry(test, e2);

	//repEntry(test, e0, e1);
	//repEntry(test, e1, e0);
	
	

	client.close();
    });
