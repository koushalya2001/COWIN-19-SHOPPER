
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new mongoose.Schema({
    item_id:Number,
    quantity:Float64Array
});

var orders = mongoose.Schema({
    user_id : Number,
    shop_id : Number,
    type : {type: Number,min:1,max:2},
    order_id : Number,
    items : [itemSchema],
    date : Date,
    time : {type: Number, min: 1, max: 48}
},
{
	collection:"orders"
});
orders.plugin(AutoIncrement, {inc_field: 'order_id'});
module.exports = mongoose.model('orders',orders);
