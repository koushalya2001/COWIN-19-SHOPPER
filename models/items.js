var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var items = mongoose.Schema({
    item_id:Number,
    name:String,
    company:String,
    price:Number,
    additional_notes:String,
    photo : String
},  {
    collection:"items"
});
items.plugin(AutoIncrement, {inc_field: 'item_id'});
module.exports = mongoose.model('items',items);
