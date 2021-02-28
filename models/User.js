var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var users = mongoose.Schema({
    name : String,
    phone : Number,
    email : {type:String,get:obfuscate},//TO ENSURE USER EMAIL IS NOT EXPOSED
    user_idnumber : Number,//AN AUTOINCREMENTED VALUE TO ENSURE UNIQUENESS IN USERID WHICH IS GENERATED USING user_idnumber,user's name and phonenumber
    user_id:String,
    hash : String,//TO ENSURE SAFETY OF USER PASSWORD
    salt:String,//TO ENSURE ENHANCED SAFETY SO THAT RAINBOW TABLES ARE NOT USED TO LOOKUP HASHES OF COMMONLY USED PASSWORDS
    type:String   //INCLUDED THE EDITION MADE BY SHOPKEEPER MODULE
},
{
	collection:"Users"
});
users.plugin(AutoIncrement, {id: 'user_id',inc_field: 'user_idnumber',});
module.exports = mongoose.model('Users',users);
