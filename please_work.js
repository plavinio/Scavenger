const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hayley:vaqgu0%2DseRhiv%2Dgehboj@cluster0-v9pak.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	console.log("Err = " + err);
	const collection = client.db("scav_test_db").collection("scav_test_col");
	// perform actions on the collection object
	function findEntry(db, entry){
            let found = db.find(entry);
            console.log("Found entry: \n" + found + "/n");
        };

	let found = findEntry(collection, {_id: 3, cat_main: "urgent", cat_sub: "keys"});
	console.log(found);

	client.close();
    });