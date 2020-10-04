var request = require("request");
var apiOptions = {
  server: "http://54.172.192.75/api/blogs/", // Change as needed
};  

/* GET Blogs List Page */
module.exports.showBlogs = function (req, res) {
  var requestOptions;
  requestOptions = {
    url: apiOptions.server,
    method: "GET",
    json: {}
  };

  request(requestOptions, function (err, response, body) {
    res.render('showBlog', {
      title: "Blog List",
      blogEntries: body
    });
  });
};

/* GET Blog Edit Page */
module.exports.editBlogPage = function (req, res) {
  var requestOptions;
  requestOptions = {
    url: apiOptions.server + req.params.blog_id,
    method: "GET",
    json: {},
  };

  request(requestOptions, function (err, response, body) {
        res.render('editBlog', {
            title: "Blog Edit",
            blog: body
        });
  });
};

/* PUT Blog Edit Action */
module.exports.editBlog = function (req, res) {
  var requestOptions, postdata;

  postdata = {
    "blogTitle": req.body.blogTitle,
    "blogText": req.body.blogText
  };

  requestOptions = {
    url: apiOptions.server + req.params.blog_id,
    method: "PUT",
    json: postdata
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 201) {
      res.redirect("/blogs");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

/* GET Blog Delete Page */
module.exports.deleteBlogPage = function (req, res) {
  var requestOptions;
  requestOptions = {
    url: apiOptions.server + req.params.blog_id,
    method: "GET",
    json: {},
  };

  request(requestOptions, function (err, response, body) {
        res.render("deleteBlog", {
            title: "Delete Blog",
            blog: body
        });
  });
};

/* DELETE Blog Delete Action */
module.exports.deleteBlog = function (req, res) {
  var requestOptions;
  requestOptions = {
    url: apiOptions.server + req.params.blog_id,
    method: "DELETE",
    json: {},
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 204) {
      res.redirect("/blogs");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};  

/* GET Blogs Add Page */
module.exports.addBlogPage = function(req, res){
    res.render("addBlog", {title: "Add Blog"});
};

/* POST Blogs Add Action */
module.exports.addBlog = function(req, res){
    var requestOptions, postdata;
    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        createdOn: req.body.createdOn
    }; 

    requestOptions = {
      url : apiOptions.server,
      method : "POST",
      json : postdata
    };
    
    request(
      requestOptions,
      function(err, response, body) {
         if (response.statusCode === 201) {
              res.redirect('/blogs');
         } else {
              _showError(req, res, response.statusCode);
         } 
      }
    ); 
};   