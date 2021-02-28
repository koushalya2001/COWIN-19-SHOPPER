var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
//ADDRESS AND LOCATION OF VOLUNTEER TO SHOW NEARBY VOLUNTEERS TO CUSTOMERS AND TO SHOW REQUESTS NEAR THEIR LOCATIONS
const addressSchema = new mongoose.Schema({
    line_1:String,
    line_2:String,
    line_3:String,
    state:String,
    district:String,
    pincode:{type:Number,min:100000,max:999999}
});
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        index:'2dsphere'                                                              //ADDITION
    }
});
var volunteers = mongoose.Schema({
    user_id : Number,
    volunteer_id:Number,                                                             //ADDITION AS VOLUNTEER_ID IS REQUIRED IN VOLUNTEER_REQUEST
    age : Number,
    aadhar_id:{type:Number,min:100000000000,max:999999999999},
    photo : String,
    address : {type: addressSchema},                                                   //ADDITION TO LOCATE VOLUNTEERS
    location : { type : pointSchema}                                                   //ADDITION TO LOCATE VOLUNTEERS
},
{
    collection:"Volunteers"
});
volunteers.plugin(AutoIncrement, {inc_field: 'delivery_id'});
module.exports = mongoose.model('Volunteers',volunteers);
