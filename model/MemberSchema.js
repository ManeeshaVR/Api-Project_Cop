const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
    memberNo:{type:Number, required:true},
    name:{type:String, required:true},
    department:{type:String, required:true},
    salary:{type:Number, required:true},
    age:{type:Number, required:true},
    nic:{type:String, required:true},
    email:{type:String, required:true},
    image:{type:String, required:true}

})

module.exports = mongoose.model('Member', MemberSchema);
