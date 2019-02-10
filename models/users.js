const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  limit: {
    type: String,
    required: [true, 'limit Is Required']
  }, 
  email: {
    unique: true,
    type: String,
    required: [true, 'Email Is Required'],
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  role: {
    type: Number,
    required: [true, 'role is required']
  },
  package: {
    type: String,
    required: [true, 'Package type is required']
  },
  packageSize: {
    type: String,
    required: [true, 'Package type is required']
  },
  porfileImg: String,
 
  name: {
    type: String,
    required: [true, 'name Is Required'],
  },
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('User', userSchema);