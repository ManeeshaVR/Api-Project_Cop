const mongoose = require('mongoose');
const DepositSchema = new mongoose.Schema({
    memberNo:{type:Number, required:true},
    name:{type:String, required:true},
    shares: {type:Number, required:true},
    comDeposits: {type:Number, required:true},
    specDeposits: {type:Number, required:true},
    penDeposits: {type:Number, required:true},
    monthlyShares: {type:Number, required:true},
    monthlyComDeposits: {type:Number, required:true},
    monthlySpecDeposits: {type:Number, required:true},
    monthlyPenDeposits: {type:Number, required:true}
})

module.exports = mongoose.model('Deposit', DepositSchema);
