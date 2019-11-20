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
	const collection = client.db("sample_weatherdata").collection("data");
	// perform actions on the collection object
	let found = collection.find({callLetters: "VCSZ"});
	console.log(found + "\n Hey, look! It actually works!");
	client.close();
    });
