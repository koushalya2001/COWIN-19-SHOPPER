var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
        required: true
    }
});

var customers = mongoose.Schema({

    user_id : Number,
    customer_id : Number,
    address : {type: addressSchema},
    location : { type : pointSchema}
},
{
	collection:"Customers"
});
customers.plugin(AutoIncrement, {inc_field: 'customer_id'});
module.exports = mongoose.model('Customers',customers);
