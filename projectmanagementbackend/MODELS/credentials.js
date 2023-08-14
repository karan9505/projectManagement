const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
 email: {type: String,required: true,unique: true,dropDups:true},
 password: { type: String, required: true },
 name: { type: String, required: true }
})
module.exports=mongoose.model('credentials',credentialSchema)