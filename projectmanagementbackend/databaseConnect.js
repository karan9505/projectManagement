const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://karanskhedkar:karannarak@projectmanagement.kwnxidy.mongodb.net/')
 .then((response) => {
  console.log("Connection successful")
 })
 .catch((error) => {
 console.log(error.message)
})