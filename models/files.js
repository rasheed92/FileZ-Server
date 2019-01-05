const mongoose = require('mongoose');


const fileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folder'
  },
  
  name: {
    type: String,
    required: [true, 'You have to set file name !']
  },
  main: {
    type: Number,
  },
  size: {
    type: Number,
    required: [true, 'You have to set a file size  !']
  },
  public : {
    type: Number,
    required: [true, 'You have to set a file public state !']
  },
  FilePath: {
    type: String,
    required: [true, 'You have to set a file Path  !']
  },
  type: {
    type: String,
    required: [true, 'You have to set file type !']
  },
});

module.exports = mongoose.model('File', fileSchema);