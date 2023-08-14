const mongoose = require('mongoose')

const projectDataSchema = new mongoose.Schema({
 theme: { type: String, require: true },
 reason: { type: String, require: true },
 type: {type: String,require:true},
 division: { type: String, require: true },
 category: {type: String,require:true},
 priority: {type: Number,require:true},
 department: {type: String,require:true},
 startDate: {type: String,require:true},
 endDate: {type: String,require:true},
 location: { type: String, require: true },
 status: { type: String, require: true,default:'Registered' },
 userId: { type: String, required: true }
})

module.exports = mongoose.model('projectData', projectDataSchema);