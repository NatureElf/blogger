
/* GET Blogs List Page */
module.exports.showBlogs = function(req, res) {
    res.render('showBlog', { title: 'Blog List',
        blogEntries: [{
            blogTitle: 'Blog 1',
            blogText: 'Welcome to Blog 1. This is where I will tell you everything about Blog 1.',
            createdOn: '2020-09-15'
        }, {
            blogTitle: 'Blog 2',
            blogText: 'Welcome to Blog 2. This is where I will tell you everything about Blog 2.',
            createdOn: '2020-09-15'
        },{
            blogTitle: 'Blog 3',
            blogText: 'Welcome to Blog 3. This is where I will tell you everything about Blog 3.',
            createdOn: '2020-09-15'
        }]
    });
};

/* GET Blog Edit Page */
module.exports.editBlog = function(req, res){
    res.render("editBlog", { title: "Edit Blog" });
};

/* GET Blog Delete Page */
module.exports.deleteBlog = function(req, res){
    res.render("deleteBlog", { title: "Delete Blog" });
};

/* GET Blogs Add Page */
module.exports.addBlog = function(req, res) {
    res.render("addBlog", { title: "Blog Add" });
};