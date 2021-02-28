var mongoose = require('mongoose');

var dummies = mongoose.Schema({
    name : String,
    age : Number
},
{
    collection:"dummy"
});

module.exports = mongoose.model('dummies',dummies);
