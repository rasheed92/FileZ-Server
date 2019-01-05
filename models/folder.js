const mongoose = require('mongoose');


const folderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 
  name: {
    type: String,
    required: [true, 'You have to set folder name !']
  },

});

module.exports = mongoose.model('folder', folderSchema);
