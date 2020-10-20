var mongoose = require('mongoose');

let dateNow = new Date().toLocaleDateString();

var blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogText: String,
  createdOn: {
    type: String,
    "default": dateNow
  },
});

mongoose.model('BlogEntry', blogSchema);