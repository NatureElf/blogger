var mongoose = require('mongoose');
var Blog = mongoose.model('BlogEntry');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.addBlog = function(req, res) {
  Blog
   .create({
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      createdOn: req.body.createdOn
     }, function(err, blog) {
       if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
       } else {
          console.log(blog);
          sendJSONresponse(res, 201, blog);
       }
     }
   );
};  

module.exports.showBlogs = function (req, res) {
  Blog
    .find()
    .exec(function (err, results) {
    if (!results) {
      sendJSONresponse(res, 404, {
        message: "no blogs found",
      });
      return;
    } else if (err) {
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    console.log(results);
    sendJSONresponse(res, 200, buildBlogList(req, res, results));
  });
};

var buildBlogList = function (req, res, results) {
  var blogs = [];
  results.forEach(function (obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.createdOn,
      _id: obj._id,
    });
  });
  return blogs;
};

module.exports.getBlog = function (req, res) {
    if (req.params && req.params.blog_id) {
        Blog
            .findById(req.params.blog_id)
            .exec(function (err, blog) {
                if (!blog) {
                    sendJSONresponse(res, 404, {
                        "message": "blogid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(blog);
                sendJSONresponse(res, 200, blog);
            });
    } else {
        console.log('No blogid specified');
        sendJSONresponse(res, 404, {
            "message": "No blogid in request"
        });
    }
};

module.exports.editBlog = function (req, res) {
  console.log(req.body);
  Blog
  .findOneAndUpdate(
    { _id: req.params.blog_id },
    {
      $set: { blogTitle: req.body.blogTitle, blogText: req.body.blogText },
    },
    function (err, response) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, response);
      }
    }
  );
}; 

module.exports.deleteBlog = function (req, res) {
  Blog
  .findByIdAndRemove(req.params.blog_id).exec(function (err, response) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 204, null);
    }
  });
}; 
