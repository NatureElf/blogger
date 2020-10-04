var express = require('express');
var router = express.Router();

/* Setup Controllers */
const homeController = require('../controllers/home');
const blogController = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', homeController.showHome);
router.get('/blogs', blogController.showBlogs);
router.get('/blogs/add', blogController.addBlogPage);
router.post('/blogs/add', blogController.addBlog);
router.get("/blogs/edit/:blog_id", blogController.editBlogPage);
router.post("/blogs/edit/:blog_id", blogController.editBlog);
router.get("/blogs/delete/:blog_id", blogController.deleteBlogPage);
router.post("/blogs/delete/:blog_id", blogController.deleteBlog);

module.exports = router;
