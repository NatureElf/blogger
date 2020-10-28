var express = require('express');
var router = express.Router();
var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload"
});

const ctrlBlogs = require('../controllers/blog');
var ctrlAuth = require("../controllers/authentication"); 


router.post('/blogs/', auth, ctrlBlogs.addBlog);
router.get('/blogs/', ctrlBlogs.showBlogs);
router.get('/blogs/:blog_id', ctrlBlogs.getBlog);
router.put('/blogs/:blog_id', auth, ctrlBlogs.editBlog);
router.delete('/blogs/:blog_id', auth, ctrlBlogs.deleteBlog);
router.post('/register/', ctrlAuth.register);
router.post('/login/', ctrlAuth.login);

module.exports = router;