var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var deliveries = mongoose.Schema({
    delivery_id : Number,
    delivery_type : {type: Number,min:1,max:2},
    volunteer_request_id : Number,
    delivery_status : {type: Number,min:1,max:4},
    status_message : String
},
{
	collection:"deliveries"
});
deliveries.plugin(AutoIncrement, {inc_field: 'delivery_id'});
module.exports = mongoose.model('deliveries',deliveries);
