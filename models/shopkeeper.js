var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var shopkeeper = mongoose.Schema({

    user_id:Number,
    shopkeeper_id:Number,
    aadhar_id:{type:Number,min:100000000000,max:999999999999},


},  {
    collection:"shopkeeper"
});
shopkeeper.plugin(AutoIncrement, {inc_field: 'shopkeeper_id'});
module.exports = mongoose.model('shopkeeper',shopkeeper);
