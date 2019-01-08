const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  limit: {
    type: Number,
    required: [true, 'limit Is Required']
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
  porfileImg: String,
  email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'name Is Required'],
  },

});

module.exports = mongoose.model('User', userSchema);