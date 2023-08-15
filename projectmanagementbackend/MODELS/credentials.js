const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
 email: {type: String,required: true,unique: true,dropDups:true},
 password: { type: String, required: true },
 name: { type: String, required: true },
 loginStatus:{type:Number,required:true,default:0}
})
module.exports=mongoose.model('credentials',credentialSchema)