//let mongo = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
//let mongoose = require('mongoose');
//let express = require('express');
const connectionURL = process.env.MONGO_URL;
const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client.connect(err => {
	console.log('Connected...');
	const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	let found = db.collection("sample_weatherdata").find({callLetters: "VCSZ"});
	console.log(found + "\n Hey, look! It actually works!");
	client.close();
    });
