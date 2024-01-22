const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    memberNo:{type:Number, required:true},
    name:{type:String, required:true},
    amount: {type:Number, required:true},
    date: {type:Date, required:true}
})

module.exports = mongoose.model('Transaction', TransactionSchema);
