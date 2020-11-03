var mongoose = require('mongoose');

let dateNow = new Date().toLocaleDateString();

var blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogText: String,
  createdOn: {
    type: String,
    default: dateNow,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

mongoose.model('BlogEntry', blogSchema);