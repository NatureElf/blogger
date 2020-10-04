var express = require('express');
var router = express.Router();

const ctrlBlogs = require('../controllers/blog');

router.post('/blogs/', ctrlBlogs.addBlog);
router.get('/blogs/', ctrlBlogs.showBlogs);
router.get('/blogs/:blog_id', ctrlBlogs.getBlog);
router.put('/blogs/:blog_id', ctrlBlogs.editBlog);
router.delete('/blogs/:blog_id', ctrlBlogs.deleteBlog);

module.exports = router;