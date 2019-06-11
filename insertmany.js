var mongoose = require('mongoose');
var fs = require("fs");
let mongodburi = require("./secrets").mongodburi;
var buf = fs.readFileSync("data.json", "utf8");
let people = JSON.parse(buf);

mongoose.connect(mongodburi, {useNewUrlParser: true});
var personSchema = new mongoose.Schema({
	address: {
		street1: {
			type: 'String'
		},
		street2: {
			type: 'String'
		},
		city: {
			type: 'String'
		},
		state: {
			type: 'Date'
		},
		zip: {
			type: 'Date'
		},
		country: {
			type: 'Date'
		}
	},
	phoneNumbers: {
		type: [
			'Mixed'
		]
	},
	emails: {
		type: [
			'String'
		]
	},
	firstName: {
		type: 'String'
	},
	middleName: {
		type: 'String'
	},
	lastName: {
		type: 'String'
	},
	gender: {
		type: 'String'
	},
	dob: {
		type: 'Date'
	},
	ssn: {
		type: 'String'
	}
});

var Person = mongoose.model('Person', personSchema);

Person.collection.insert(people, onInsert);

function onInsert(err, docs) {
    if (err) {
		console.info(err);
    } else {
        console.info('%d people were successfully stored.', docs.length);
	}
	mongoose.connection.close()

}