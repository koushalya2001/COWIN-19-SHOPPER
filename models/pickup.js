var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var pickup = mongoose.Schema({
    slot: {type: Number, min: 1, max: 48},
    date : Date,
    order_id : Number,
    status : {type: Number,min:1,max:3},
    pickup_id : Number
},
{
	collection:"pickup"
});
pickup.plugin(AutoIncrement, {inc_field: 'pickup_id'});
module.exports = mongoose.model('pickup',pickup);
