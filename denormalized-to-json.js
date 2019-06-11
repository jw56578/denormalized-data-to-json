
/// read enter file syncronously

//maintain current lpersonid

//maintain current  addressid


const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

const instream = fs.createReadStream("peopledata.csv");
const outstream = new stream();
const rl = readline.createInterface(instream,outstream);

let personId = -1;
let addressId = 0;
let emailAddressId = 0;
let phoneId = 0;

let data = [];
let currentPerson = {}

rl.on("line",(line)=>{

    if(personId === -1){
      personId = 0;
      return;
    }
      
    const fields = line.split(",");
    if(fields[0] !== personId){
        personId = fields[0] ;
        currentPerson = {};
        currentPerson.address = {};
        currentPerson.phoneNumbers = [];
        currentPerson.emails = []
        currentPerson.firstName = fields[1];
        currentPerson.middleName = fields[2];
        currentPerson.lastName = fields[3];
        currentPerson.gender = fields[4];
        currentPerson.dob = fields[5];
        currentPerson.ssn = fields[6];
       data.push(currentPerson);
       addressId = 0;
       emailAddressId = 0;
       phoneId = 0;
    }
    if(addressId !== fields[7]){
        addressId = fields[7];
        currentPerson.address.street1 = fields[8];
        currentPerson.address.street2 = fields[9];
        currentPerson.address.city = fields[10];
        currentPerson.address.state = fields[11];
        currentPerson.address.zip = fields[12];
        currentPerson.address.country = fields[13];
        emailAddressId = 0;
        phoneId =0;
    }
    if(emailAddressId !== fields[14]){
        emailAddressId  = fields[14];
        currentPerson.emails.push(fields[15])
        phoneId =0;
    }
    if(phoneId !== fields[18]){
        phoneId  = fields[18];
        currentPerson.phoneNumbers.push({areaCode:fields[19],number:fields[20]})
    
    }

});

rl.on("close",()=>{
    //write to json file

    let json = JSON.stringify(data).replace(/\\n/g, "\\n")
                                      .replace(/\\'/g, "\\'")
                                      .replace(/\\"/g, '\\"')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, "\\r")
                                      .replace(/\\t/g, "\\t")
                                      .replace(/\\b/g, "\\b")
                                      .replace(/\\f/g, "\\f");

    fs.writeFile('./data.json', json , 'utf-8');
})