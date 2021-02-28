var mongoose = require('mongoose');
const items=require('./items')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const shopkeeper=require('./shopkeeper')
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

const timeschema = new mongoose.Schema({
    start_time: {type: Number, min: 1, max: 48},
    end_time: {type: Number, min: 1, max: 48}
});

const addressSchema = new mongoose.Schema({
    line_1:String,
    line_2:String,
    line_3:String,
    state:String,
    district:String,
    pincode:{type:Number,min:100000,max:999999}
});

const slotSchema = new mongoose.Schema({
    slot_id:{type: Number, min: 1, max: 48},
    count:{type: Number, min: 0},
    available:{type:Boolean},           //CHANGE TO ENSURE TIME SLOTS PICKED UP BY ONE  USER IS NOT TAKEN UP BY ANOTHER USER
});

var shops = mongoose.Schema({

    shopkeeper_id:Number,
    shops_id:Number,
    shop_name:String,
    category:String,
    available_day:[String],   //CHANGE TO INCORPORATE DAYS
    available_time:[timeschema],
    address:{type: addressSchema} ,
    location:{type:pointSchema,
             index:true},
    items:[{
        type:mongoose.ObjectId,
        ref:items
    }],
   // createdAt:Date,         
    day1_slots:[slotSchema],
    day2_slots:[slotSchema],
    delivery_available: Boolean

},  {
    collection:"shops",
    timestamps:true               //ADDITION TO SHOW RECENT SHOPS
});

  shops.index({ location: "2dsphere" },{ "createdAt": -1 });//INDEX CREATION STEP 2

shops.plugin(AutoIncrement, {inc_field:'shops_id'});
module.exports = mongoose.model('shops',shops);
/*updated_at: {type: Date, default: Date.now,index:true}//INDEX CREATION STEP 1
});*/
//shops.createIndex(  )