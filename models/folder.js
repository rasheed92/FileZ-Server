const mongoose = require('mongoose');
const folderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'files'
  },
  root: {
    type: Boolean,
    required: [true]
  },
  name: {
    type: String,
    required: [true, 'You have to set folder name !']
  },

});

module.exports = mongoose.model('folder', folderSchema);
