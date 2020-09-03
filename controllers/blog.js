
/* GET Blogs List Page */
module.exports.showBlogs = function(req, res) {
    res.render('showBlog', { title: 'Blog List'});
};

/* GET Blogs Add Page */
module.exports.addBlog = function(req, res) {
    res.render("addBlog", { title: "Blog Add" });
};